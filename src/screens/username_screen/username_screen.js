// Library Imports
import React                from 'react';
import RN                   from 'react-native';

// Local Imports
import { styles }            from './username_screen_styles.js';
import { setStateCallback }  from '../../utilities/function_utility.js';
import { COLORS }            from '../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class UsernameScreen extends React.PureComponent {

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

  _onPress() {
    this.setState({ isLoading: true, isError: false, errorText: '' }, () => {
      this.props.editUsername(this.props.authToken, this.props.firebaseUserObj, this.state.inputtedText)
        .then(() => {
          if (this.props.currentScreen === '_UsernameScreenLogin') {
            this.props.navigateTo('AvatarScreen');
          } else {
            this.props.goBack();
          }
        })
        .catch((error) => {
          if (error.description === 'username used') { //TODO: update with proper error descriptions from user actions
            this.setState({ isError: true, errorText: 'Username taken' });
          } else if (error.description === 'username invalid') {
            this.setState({ isError: true, errorText: 'Username invalid' });
          } else {
            defaultErrorAlert(error);
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        })
    })
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
      <RN.View ref={(ref) => this.textInputView = ref} style={[styles.textInputView]}>
        <RN.Text style={styles.atText}>
          @
        </RN.Text>
        <RN.TextInput
          ref={(ref) => this.textInput = ref}
          style={[styles.textInput, this.state.isError && styles.borderRed]}
          onChangeText={(value) => this.setState({ inputtedText: value })}
          value={this.state.inputtedText}
          placeholder={'username'}
          autoCapitalize={'none'}
          autoFocus={true}
          maxLength={32}
          placeholderTextColor={COLORS.grey400}
          underlineColorAndroid={'transparent'}
          onFocus={() => !this.state.isError && this.textInput.setNativeProps({style: [styles.borderHighlighted, styles.textHighlighted]})}
          onEndEditing={() => !this.state.isError && this.textInput.setNativeProps({style: styles.textInput})}
        />
      </RN.View>
    )
  }

  _renderErrorText() {
    if (this.state.isLoading) {
      return <RN.ActivityIndicator size='small' color={COLORS.grey400} />
    } else {
      return (
        <RN.Text style={[styles.errorText, !this.state.isError && styles.transparentText]}>
          {this.state.errorText}
        </RN.Text>
      )
    }
  }

  //TODO: create utility component shared with LoginScreen
  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[styles.nextButtonBackground, (this.state.inputtedText.length === 0) && styles.nextButtonBackgroundDisabled]}
        onPress={() => this._onPress()}
        disabled={(this.state.inputtedText.length === 0) && !this.state.isLoading}
        >
        { this.state.isLoading ?
          <RN.ActivityIndicator size='small' color={COLORS.grey400} /> :
          <RN.Text style={[styles.nextButtonText, (this.state.inputtedText.length === 0) && styles.nextButtonTextDisabled]}>
            {this.props.currentScreen === '_UsernameScreenLogin' ? 'Next' : 'Done'}
          </RN.Text>
        }
      </RN.TouchableOpacity>
    )
  }

  render() {
    return (
        <RN.View style={styles.container}>
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderTextInput()}
          <RN.View style={{flex: 1}} />
          {this._renderNextButton()}
          <RN.View style={{flex: 5}} />
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default UsernameScreen;
