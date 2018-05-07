import t from 'tcomb-form-native'
import _ from 'lodash'

const stylesheet = _.cloneDeep(t.form.Form.stylesheet)

stylesheet.textbox.normal.color = '#ffffff'
stylesheet.textbox.error.color = '#ffffff'

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderColor = '#ffffff';
stylesheet.textboxView.error.borderColor = '#ffffff';
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textbox.normal.marginBottom = 5;
stylesheet.textbox.error.marginBottom = 5;

stylesheet.controlLabel.normal.color = '#ffffff'

export default stylesheet

