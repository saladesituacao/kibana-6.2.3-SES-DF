import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PanelHeader } from './panel_header';
import { PanelError } from './panel_error';

export class DashboardPanel extends React.Component {
  async componentDidMount() {
    this.props.renderEmbeddable(this.panelElement, this.props.panel);
  }

  onFocus = () => {
    const { onPanelFocused, panel } = this.props;
    if (onPanelFocused) {
      onPanelFocused(panel.panelIndex);
    }
  };

  onBlur = () => {
    const { onPanelBlurred, panel } = this.props;
    if (onPanelBlurred) {
      onPanelBlurred(panel.panelIndex);
    }
  };

  componentWillUnmount() {
    this.props.onDestroy();
  }

  renderEmbeddedContent() {
    return (
      <div
        id="embeddedPanel"
        className="panel-content"
        ref={panelElement => this.panelElement = panelElement}
      />
    );
  }

  renderEmbeddedError() {
    const { error } = this.props;
    const errorMessage = error.message || JSON.stringify(error);
    return <PanelError error={errorMessage} />;
  }

  renderEmbeddedContent() {
    return (
      <div
        id="embeddedPanel"
        className="panel-content"
        ref={panelElement => this.panelElement = panelElement}
      />
    );
  }

  renderEmbeddedError() {
    return <PanelError error={this.props.error} />;
  }

  render() {
    const { viewOnlyMode, error, panel, embeddableFactory } = this.props;
    const classes = classNames('panel panel-default', this.props.className, {
      'panel--edit-mode': !viewOnlyMode
    });
    //editado por edmar moretti
    //console.info(this.props.panel.notShowInMobile)

    //if(parseInt(document.all?document.body.clientWidth:window.innerWidth,10) < 992){

    if(parseInt(document.all?document.body.clientWidth:window.innerWidth,10) < 992 && this.props.panel.notShowInMobile != undefined && this.props.panel.notShowInMobile == true){
		return (
		<div
			className="hidden"
			notShowInMobile={this.props.panel.notShowInMobile}
		>
		</div>
		);
	} else {
		return (
		  <div
			className="dashboard-panel"
			onFocus={this.onFocus}
			onBlur={this.onBlur}
		  >
			<div
			  className={classes}
			  data-test-subj="dashboardPanel"
			>
			  <PanelHeader
				embeddableFactory={embeddableFactory}
				panelId={panel.panelIndex}
				notShowInMobile={this.props.panel.notShowInMobile}
			  />

			  {error ? this.renderEmbeddedError() : this.renderEmbeddedContent()}

			</div>
		  </div>
		);
	}
  }
}

DashboardPanel.propTypes = {
  panel: PropTypes.shape({
    panelIndex: PropTypes.string,
  }),
  renderEmbeddable: PropTypes.func.isRequired,
  viewOnlyMode: PropTypes.bool.isRequired,
  onDestroy: PropTypes.func.isRequired,
  onPanelFocused: PropTypes.func,
  onPanelBlurred: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  embeddableFactory: PropTypes.object.isRequired,
};
