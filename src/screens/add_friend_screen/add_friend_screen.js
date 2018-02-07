// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import LoadingModal               from '../../components/loading_modal/loading_modal.js';
import { styles }                 from './add_friend_screen_styles.js';
import { setStateCallback }       from '../../utilities/function_utility.js';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility.js';
import { defaultErrorAlert }      from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

class AddFriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      inputtedText:  '',
      isSuccessful:  true,
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
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true, isSuccessful: false, isError: false, errorText: '' }, () => {
      this.props.createFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, null, this.state.inputtedText)
        .then(() => {
          this.setState({ isSuccessful: true, errorText: 'Friend request sent' });
        })
        .catch((error) => {
          if (error.message === 'User not found') {
            this.setState({ isError: true, errorText: 'User not found' });
          } else if (error.message === 'Friendship already exists') {
            this.setState({ isError: true, errorText: 'Friend request already sent' });
          } else if (error.message === 'Requester and requestee cannot be the same') {
            this.setState({ isError: true, errorText: "Go to 'Recent' tab for more friends!" });
          } else {
            defaultErrorAlert(error);
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  _onFocus = () => {
    if (this.state.isError) {
      this.textInput.setNativeProps({style: [UTILITY_STYLES.borderRed, UTILITY_STYLES.textHighlighted]});
    } else {
      this.textInput.setNativeProps({style: [UTILITY_STYLES.borderHighlighted, UTILITY_STYLES.textHighlighted]});
    }
  }

//--------------------------------------------------------------------//
// Render Methods
//--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.marginTop50]}>
        Enter Username
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.marginTop5]}>
        A friend request will be sent directly to the user.
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
        onFocus={this._onFocus}
        onEndEditing={() => this.textInput.setNativeProps({style: styles.textInput})}
      />
    )
  }

  _renderErrorText() {
    return (
      <RN.Text style={[styles.errorText, this.state.errorText.length === 0 && UTILITY_STYLES.transparentText, this.state.isSuccessful && UTILITY_STYLES.textHighlighted]}>
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
          {'Add Friend'}
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
      <RN.KeyboardAvoidingView behavior={RN.Platform.OS === 'ios' ? 'padding' : null}>
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss} accessible={false}>
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
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}


//--------------------------------------------------------------------//


export default AddFriendScreen;
