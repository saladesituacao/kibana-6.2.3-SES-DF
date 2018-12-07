import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { PanelOptionsMenu } from './panel_options_menu';

import {
  deletePanel,
  destroyEmbeddable,
  maximizePanel,
  minimizePanel,
  resetPanelTitle,
  setPanelTitle,
  setShowInMobile
} from '../../actions';

import {
  getEmbeddable,
  getEmbeddableEditUrl,
  getMaximizedPanelId,
  getPanel,
} from '../../selectors';

//editado por edmar moretti
const mapStateToProps = ({ dashboard }, { panelId }) => {
  const embeddable = getEmbeddable(dashboard, panelId);
  const panel = getPanel(dashboard, panelId);
  const embeddableTitle = embeddable ? embeddable.title : '';
 
  return {
    panelTitle: panel.title === undefined ? embeddableTitle : panel.title,
    editUrl: embeddable ? getEmbeddableEditUrl(dashboard, panelId) : null,
    isExpanded: getMaximizedPanelId(dashboard) === panelId,
    notShowInMobile: panel.notShowInMobile === undefined ? false : panel.notShowInMobile
  };
};

/**
 * @param dispatch {Function}
 * @param embeddableFactory {EmbeddableFactory}
 * @param panelId {string}
 */
const mapDispatchToProps = (dispatch, { embeddableFactory, panelId }) => ({
  onDeletePanel: () => {
    dispatch(deletePanel(panelId));
    dispatch(destroyEmbeddable(panelId, embeddableFactory));
  },
  onMaximizePanel: () => dispatch(maximizePanel(panelId)),
  onMinimizePanel: () => dispatch(minimizePanel()),
  onResetPanelTitle: () => dispatch(resetPanelTitle(panelId)),
  onUpdatePanelTitle: (newTitle) => dispatch(setPanelTitle(newTitle, panelId)),
  onUpdatePanelnotShowInMobileInput: (ShowInMobile) => dispatch(setShowInMobile(ShowInMobile, panelId))
});
//editado por edmar moretti
const mergeProps = (stateProps, dispatchProps) => {
  const { isExpanded, editUrl, panelTitle, notShowInMobile } = stateProps;
  const { onMaximizePanel, onMinimizePanel, ...dispatchers } = dispatchProps;
  const toggleExpandedPanel = () => isExpanded ? onMinimizePanel() : onMaximizePanel();

  return {
    panelTitle,
    toggleExpandedPanel,
    isExpanded,
    editUrl,
    notShowInMobile,
    ...dispatchers,
  };
};

export const PanelOptionsMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PanelOptionsMenu);

PanelOptionsMenuContainer.propTypes = {
  panelId: PropTypes.string.isRequired,
  /**
   * @type {EmbeddableFactory}
   */
  embeddableFactory: PropTypes.shape({
    destroy: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    addDestroyEmeddable: PropTypes.func.isRequired,
  }).isRequired,
};
