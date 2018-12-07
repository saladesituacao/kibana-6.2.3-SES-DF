import React from 'react';
import PropTypes from 'prop-types';

export function PanelHeader({ title, actions, isViewOnlyMode, hidePanelTitles, notShowInMobile }) {
  if (isViewOnlyMode && (!title || hidePanelTitles)) {
    return (
      <div className="panel-heading-floater">
        <div className="kuiMicroButtonGroup">
          {actions}
        </div>
      </div>
    );
  }

  return (
    <div className="panel-heading">
      <span
        data-test-subj="dashboardPanelTitle"
        className="panel-title"
        title={title}
        aria-label={`Dashboard panel: ${title}`}
      >
        {hidePanelTitles ? '' : title}
      </span>

      <div className="kuiMicroButtonGroup">
        {actions}
      </div>
    </div>
  );
}

PanelHeader.propTypes = {
  isViewOnlyMode: PropTypes.bool,
  title: PropTypes.string,
  notShowInMobile: PropTypes.bool,
  actions: PropTypes.node,
  hidePanelTitles: PropTypes.bool.isRequired,
};
