// Library Imports
import React                from 'react';
import RN                   from 'react-native';

// Local Imports
import LoadingModal               from '../../components/loading_modal/loading_modal.js';
import { styles }                 from './username_screen_styles.js';
import { setStateCallback }       from '../../utilities/function_utility.js';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility.js';
import { defaultErrorAlert }      from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class UsernameScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      inputtedText:  '',
      isError:       false,
      errorText:     '',
      isLoading:     false,
    };
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Validates entered username, PUTs to API, and changes screen
  _onPress = () => {
    this.setState({ isError: false, errorText: '' }, () => {
      let text = this.state.inputtedText;

      let isNotSpecialChar = /^[A-Za-z0-9._-]+$/.test(text);
      let isStartWithSpecialChar = /^[._-]/.test(text);
      let isEndWithSpecialChar = /[._-]$/.test(text);
      let isConsecutiveSpecialChar = /[._-]{2}/.test(text);
      let isTooShort = text.length < 3;

      if (!isNotSpecialChar) {
        this.setState({ isError: true, errorText: 'Letters, numbers, -, _, or . only' });
        return;
      } else if (isStartWithSpecialChar || isEndWithSpecialChar) {
        this.setState({ isError: true, errorText: 'No leading or trailing special characters' });
        return;
      } else if (isConsecutiveSpecialChar) {
        this.setState({ isError: true, errorText: 'No consecutive special characters' });
        return;
      } else if (isTooShort) {
        this.setState({ isError: true, errorText: 'Must be at least 3 characters' });
        return;
      }

      this.setState({ isLoading: true } , () => {
        this.props.editUsername(this.props.authToken, this.props.firebaseUserObj, text)
          .then(() => {
            if (this.props.currentScreen === 'UsernameScreenLogin') {
              this.props.navigateTo('AvatarScreen', { isLogin: true });
            } else {
              this.props.goBack();
            }
          })
          .catch((error) => {
            if (error.description === 'Username has already been taken') {
              this.setState({ isError: true, errorText: 'Username taken' });
            } else if (error.description === 'PUT user for username failed') {
              this.setState({ isError: true, errorText: 'Username invalid' });
            } else {
              defaultErrorAlert(error);
            }
          })
          .finally(() => {
            this.setState({ isLoading: false });
          })
      });
    });
  }

//--------------------------------------------------------------------//
// Render Methods
//--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.marginTop50]}>
        Choose a username
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.regularBlackText16, UTILITY_STYLES.marginTop5]}>
        You can always change it later
      </RN.Text>
    )
  }

  _renderTextInput() {
    return (
      <RN.TextInput
        ref={(ref) => this.textInput = ref}
        style={[styles.textInput, this.state.isError && UTILITY_STYLES.borderRed]}
        onChangeText={(value) => this.setState({ inputtedText: value })}
        value={this.state.inputtedText}
        placeholder={'username'}
        autoCapitalize={'none'}
        autoFocus={true}
        maxLength={12}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        onFocus={() => !this.state.isError && this.textInput.setNativeProps({style: [UTILITY_STYLES.borderHighlighted, UTILITY_STYLES.textHighlighted]})}
        onEndEditing={() => !this.state.isError && this.textInput.setNativeProps({style: styles.textInput})}
      />
    )
  }

  _renderErrorText() {
    return (
      <RN.Text style={[styles.errorText, !this.state.isError && UTILITY_STYLES.transparentText]}>
        {this.state.errorText}
      </RN.Text>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, this.state.inputtedText.length === 0 && UTILITY_STYLES.nextButtonBackgroundDisabled]}
        onPress={this._onPress}
        disabled={(this.state.inputtedText.length === 0) && !this.state.isLoading}
        >
        <RN.Text style={[UTILITY_STYLES.lightWhiteText18, this.state.inputtedText.length === 0 && UTILITY_STYLES.nextButtonTextDisabled]}>
          {this.props.currentScreen === 'UsernameScreenLogin' ? 'Next' : 'Done'}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading} />
    )
  }

  render() {
    return (
        <RN.View style={UTILITY_STYLES.containerStart}>
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderTextInput()}
          {this._renderErrorText()}
          <RN.View style={{flex: 1}} />
          {this._renderNextButton()}
          <RN.View style={{flex: 10}} />
          {this._renderLoadingModal()}
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default UsernameScreen;
