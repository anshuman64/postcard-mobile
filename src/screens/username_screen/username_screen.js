// Library Imports
import React                from 'react';
import RN                   from 'react-native';

// Local Imports
import LoadingModal          from '../../components/loading_modal/loading_modal.js';
import { styles }            from './username_screen_styles.js';
import { setStateCallback }  from '../../utilities/function_utility.js';
import { COLORS }            from '../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';


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

  _onPress = () => {
    this.setState({ isError: false, errorText: '' }, () => {
      let isNotSpecialChar = /^[A-Za-z0-9._-]+$/.test(this.state.inputtedText);
      let isStartWithSpecialChar = /^[._-]/.test(this.state.inputtedText);
      let isEndWithSpecialChar = /[._-]$/.test(this.state.inputtedText);
      let isConsecutiveSpecialChar = /[._-]{2}/.test(this.state.inputtedText);
      let isTooShort = this.state.inputtedText.length < 3;

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
        this.props.editUsername(this.props.authToken, this.props.firebaseUserObj, this.state.inputtedText)
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
      <RN.Text style={styles.titleText}>
        Choose a username
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={styles.subtitleText}>
        You can always change it later
      </RN.Text>
    )
  }

  //TODO: adjust maxLength to match backend restrictions
  _renderTextInput() {
    return (
      <RN.TextInput
        ref={(ref) => this.textInput = ref}
        style={[styles.textInput, this.state.isError && styles.borderRed]}
        onChangeText={(value) => this.setState({ inputtedText: value })}
        value={this.state.inputtedText}
        placeholder={'username'}
        autoCapitalize={'none'}
        autoFocus={true}
        maxLength={12}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        onFocus={() => !this.state.isError && this.textInput.setNativeProps({style: [styles.borderHighlighted, styles.textHighlighted]})}
        onEndEditing={() => !this.state.isError && this.textInput.setNativeProps({style: styles.textInput})}
      />
    )
  }

  _renderErrorText() {
    return (
      <RN.Text style={[styles.errorText, !this.state.isError && styles.transparentText]}>
        {this.state.errorText}
      </RN.Text>
    )
  }

  //TODO: create utility component shared with LoginScreen
  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[styles.nextButtonBackground, (this.state.inputtedText.length === 0) && styles.nextButtonBackgroundDisabled]}
        onPress={this._onPress}
        disabled={(this.state.inputtedText.length === 0) && !this.state.isLoading}
        >
        <RN.Text style={[styles.nextButtonText, (this.state.inputtedText.length === 0) && styles.nextButtonTextDisabled]}>
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
        <RN.View style={styles.container}>
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
