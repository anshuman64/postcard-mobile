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
      inputtedText:         '',
      isError:      false,
      errorText:            '',
      isLoading:            false,
    };

    this.timer = null;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPress() {
    this.setState({ isLoading: true, isError: false, errorText: '' }, () => {
      this.props.editUsername('eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg4YWZlYjQyNzI2ZTIzOTQyMWIwZDc5OTdjN2FiYzc3NGU0ZGUxOTkifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaW5zaXlhLW1vYmlsZSIsImF1ZCI6Imluc2l5YS1tb2JpbGUiLCJhdXRoX3RpbWUiOjE1MTUzNTM4MzcsInVzZXJfaWQiOiJ0c2d1R2Nya01qYlpsSHZmUU1rQXJqakFERmkyIiwic3ViIjoidHNndUdjcmtNamJabEh2ZlFNa0FyampBREZpMiIsImlhdCI6MTUxNTM1NjQ4NSwiZXhwIjoxNTE1MzYwMDg1LCJwaG9uZV9udW1iZXIiOiIrMTQwODMwNjAwNTkiLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIisxNDA4MzA2MDA1OSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.LVsCwDqKSu_-RBewwk5s3SKjOZJoTJQeHMVtznUt-py58S6OGvioSZOBKFYOizVcmg_wVFSIu4qjCxMc2C-m4XldVYRQtFYjLOIOgqnwaR-Vbwd4llESTJ36FBMmix2eUgihghdlDzDYeMugOiBq7ySP4In2CBF5a7XDnKye2eetCMWhqdRboVsB-4CiPL404HM3DtiQ_skQHqBSuveQWcVziH9Dg_fYniiLJZBi3gKWVxRp6BqLNxY-G239vku8KF8wYo6e7RjDUpOsEeynxXBZIfS1NHnmCNv5vm1A51fW0itWayAJoalUXTK2i5fsSHOlLhydrzRzb2wp3_t3Ww', this.props.firebaseUserObj, this.state.inputtedText)
        .then(() => {
          if (this.props.isLogin) {
            this.props.navigateTo('AvatarScreen', { isLogin: true });
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
      <RN.TextInput
        ref={(ref) => this.textInput = ref}
        style={[styles.textInput, this.state.isError && styles.borderRed]}
        onChangeText={(value) => this.setState({ inputtedText: value })}
        value={this.state.inputtedText}
        placeholder='username'
        autoFocus={true}
        maxLength={32}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        onFocus={() => !this.state.isError && this.textInput.setNativeProps({style: [styles.borderHighlighted, styles.textHighlighted]})}
        onEndEditing={() => !this.state.isError && this.textInput.setNativeProps({style: styles.textInput})}
      />
    )
  }

  _renderUsernameTakenText() {
    if (this.state.isLoading) {
      return <RN.ActivityIndicator size='small' color={COLORS.grey400} />
    } else {
      return (
        <RN.Text style={[styles.invalidCodeText, !this.state.isError && styles.invalidCodeTextTransparent]}>
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
            {this.props.isLogin ? 'Next' : 'Done'}
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
