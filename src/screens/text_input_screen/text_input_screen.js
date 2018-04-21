// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import LoadingModal               from '../../components/loading_modal/loading_modal';
import { styles }                 from './text_input_screen_styles';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility';
import { defaultErrorAlert }      from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  convoId (int): id of group when on NameGroupScreen
  postText (string): preserve data from ShareScreen to pass to HeaderContainer
  placeholderText (string): preserve data from ShareScreen to pass to HeaderContainer
  imagePath (string): preserve data from ShareScreen to pass to HeaderContainer
  imageType (string): preserve data from ShareScreen to pass to HeaderContainer
*/
class TextInputScreen extends React.PureComponent {

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
  _onPressUsernameScreen = () => {
    if (this.state.isLoading) {
      return;
    }

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
        this.props.editUsername(this.props.client.authToken, this.props.client.firebaseUserObj, text)
          .then(() => {
            if (this.props.currentScreen === 'UsernameScreenLogin') {
              this.props.navigateTo('AvatarScreen', { isLogin: true });
            } else {
              this.props.goBack();
            }
          })
          .catch((error) => {
            if (error.description === 'Username taken') {
              this.setState({ isError: true, errorText: 'Username taken' });
            } else if (error.description) {
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

  // Validates entered username and requests friendship
  _onPressAddFriendScreen = () => {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true, isSuccessful: false, isError: false, errorText: '' }, () => {
      this.props.createFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, null, this.state.inputtedText)
        .then((friendship) => {
          this.props.sendFriendshipRequest({ friendship: friendship });
          this.setState({ isSuccessful: true, errorText: 'Friend request sent' });
        })
        .catch((error) => {
          if (error.message === 'User not found') {
            this.setState({ isError: true, errorText: 'User not found' });
          } else if (error.message === 'Friendship already exists') {
            this.setState({ isError: true, errorText: 'Friend request already sent' });
          } else if (error.message === 'Requester and requestee cannot be the same') {
            this.setState({ isError: true, errorText: "Go to 'Recent' tab for more friends!" });
          } else if (error.message === 'Requester blocked by requestee') {
            this.setState({ isError: true, errorText: "This user has blocked you" });
          } else if (error.message === 'Requestee blocked by requester') {
            this.setState({ isError: true, errorText: "You have blocked this user" });
          } else {
            defaultErrorAlert(error);
          }
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  _onPressNameCircleScreen = () => {
    this.props.navigateTo('CreateCircleScreen', {
      circleName: this.state.inputtedText,
      postText: this.props.postText,
      placeholderText: this.props.placeholderText,
      imagePath: this.props.imagePath,
      imageType: this.props.imageType,
    });
  }

  _onPressNameGroupScreen = () => {
    if (this.state.isLoading) {
      return;
    }

    this.setState({ isLoading: true, isSuccessful: false, isError: false, errorText: '' }, () => {
      this.props.editGroupName(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.convoId, this.state.inputtedText)
        .then(() => {
          this.props.goBack();
        })
        .catch((error) => {
          defaultErrorAlert(error);
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
    let titleString;

    if (this.props.currentScreen === 'UsernameScreen' || this.props.currentScreen === 'UsernameScreenLogin') {
      titleString = 'Choose Username';
    } else if (this.props.currentScreen === 'AddFriendScreen') {
      titleString = 'Enter Username';
    } else if (this.props.currentScreen === 'NameCircleScreen') {
      titleString = 'Choose Circle Name';
    } else if (this.props.currentScreen === 'NameGroupScreen') {
      titleString = 'Choose Group Name';
    }

    return (
      <RN.Text style={[UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.marginTop50]}>
        {titleString}
      </RN.Text>
    )
  }

  _renderSubtitle() {
    let subtitleString;
    let currentScreen = this.props.currentScreen;

    if (currentScreen === 'UsernameScreen' || currentScreen === 'UsernameScreenLogin') {
      subtitleString = 'You can change it at any time.';
    } else if (currentScreen === 'AddFriendScreen') {
      subtitleString = 'A friend request will be sent directly to the user.';
    } else if (currentScreen === 'NameCircleScreen') {
      subtitleString = 'Circles make it easier to select friends to send posts to.';
    } else if (currentScreen === 'NameGroupScreen') {
      subtitleString = 'Group name will be seen by all members.';
    }

    return (
      <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.marginTop5, {width: 300}]}>
        {subtitleString}
      </RN.Text>
    )
  }

  _renderTextInput() {
    let placeholderText;
    let currentScreen = this.props.currentScreen;

    if (currentScreen === 'UsernameScreen' || currentScreen === 'UsernameScreenLogin' || currentScreen === 'AddFriendScreen') {
      placeholderText = 'Enter username';
    } else if (currentScreen === 'NameCircleScreen') {
      placeholderText = 'Enter circle name';
    } else if (currentScreen === 'NameGroupScreen') {
      placeholderText = 'Enter group name';
    }

    return (
      <RN.TextInput
        ref={(ref) => this.textInput = ref}
        style={[styles.textInput, this.state.isError && UTILITY_STYLES.borderRed]}
        onChangeText={(value) => this.setState({ inputtedText: value })}
        value={this.state.inputtedText}
        placeholder={placeholderText}
        autoCapitalize={'none'}
        autoFocus={true}
        maxLength={12}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
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
    let buttonText;
    let buttonFunction;
    let currentScreen = this.props.currentScreen;

    if (currentScreen === 'UsernameScreen') {
      buttonText = 'Done';
      buttonFunction = this._onPressUsernameScreen;
    } else if (currentScreen === 'UsernameScreenLogin') {
      buttonText = 'Next';
      buttonFunction = this._onPressUsernameScreen;
    } else if (currentScreen === 'AddFriendScreen') {
      buttonText = 'Add Friend';
      buttonFunction = this._onPressAddFriendScreen;
    } else if (currentScreen === 'NameCircleScreen') {
      buttonText = 'Next';
      buttonFunction = this._onPressNameCircleScreen;
    } else if (currentScreen === 'NameGroupScreen') {
      buttonText = 'Done';
      buttonFunction = this._onPressNameGroupScreen;
    }

    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, this.state.inputtedText.length === 0 && UTILITY_STYLES.nextButtonBackgroundDisabled]}
        onPress={buttonFunction}
        disabled={(this.state.inputtedText.length === 0) && !this.state.isLoading}
        >
        <RN.Text style={[UTILITY_STYLES.lightWhiteText18, this.state.inputtedText.length === 0 && UTILITY_STYLES.nextButtonTextDisabled]}>
          {buttonText}
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


export default TextInputScreen;
