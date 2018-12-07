import React from 'react';
import PropTypes from 'prop-types';

import {
  KuiButton,
} from 'ui_framework/components';

import {
  keyCodes,
} from '@elastic/eui';

export function PanelOptionsMenuForm({ title, notShowInMobile, onReset, onUpdatePanelTitle, onClose, onUpdatePanelnotShowInMobileInput }) {
  function onInputChange(event) {
    onUpdatePanelTitle(event.target.value);
  }

  function onKeyDown(event) {
    if (event.keyCode === keyCodes.ENTER) {
      onClose();
    }
  }
  function onCkChange(event){
	  onUpdatePanelnotShowInMobileInput(event.target.checked);
  }
//console.log("Valor de notShowInMobile: " + notShowInMobile);
  return (
    <div>
		<div
		  className="kuiVerticalRhythm dashboardPanelMenuOptionsForm"
		  data-test-subj="dashboardPanelTitleInputMenuItem"
		>
		  <label className="kuiFormLabel" htmlFor="panelTitleInput">Panel title</label>
		  <input
			id="panelTitleInput"
			name="min"
			type="text"
			className="kuiTextInput"
			value={title}
			onChange={onInputChange}
			onKeyDown={onKeyDown}
		  />
		</div>
		<div class="checkbox dashboardPanelMenuOptionsForm">
		 <label class="kuiFormLabel" from="notShowInMobileInput">
			Não utilizar em Mobile	  
			<input 
		class="kuiCheckBox"
		id="notShowInMobileInput"
		ng-checked={notShowInMobile}
		checked={notShowInMobile}
		name="notShowInMobile"
		onChange={onCkChange}
		type="checkbox" />
		
		</label>
		</div>
		<div>
		  <KuiButton
			buttonType="hollow"
			onClick={onReset}
		  >
			Reset title
		  </KuiButton>
		</div>
    </div>
  );
}
//editado por edamr moretti
PanelOptionsMenuForm.propTypes = {
  title: PropTypes.string,
  notShowInMobile: PropTypes.bool,
  onUpdatePanelTitle: PropTypes.func.isRequired,
  onUpdatePanelnotShowInMobileInput: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
