// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// Local Imports
import AvatarContainer        from '../../components/avatar/avatar_container';
import LoadingModal           from '../../components/loading_modal/loading_modal';
import { styles }             from './avatar_screen_styles';
import { UTILITY_STYLES }     from '../../utilities/style_utility';
import { defaultErrorAlert }  from '../../utilities/error_utility';

//--------------------------------------------------------------------//


/*
Required Screen Props:
  -
Optional Screen Props:
  isLogin (bool): determines what screen to go to after pressing 'Done'
*/
class AvatarScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarMedium:  null,
      isLoading:     false,
    };

    this.existingAvatar = null;
    this.isButtonPressed = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // If user has an avatar, get image and render it
  componentDidMount() {
    let client = this.props.usersCache[this.props.client.id];
    let medium = client ? client.avatar_medium : null;
    let cachedMedium = medium ? this.props.mediaCache[medium.id] : null;

    if (cachedMedium) {
      this.setState({ avatarMedium: cachedMedium });
      this.existingAvatar = cachedMedium;
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setAvatarUrl = (avatarMedium) => {
    this.props.editAvatar(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, avatarMedium)
      .then(() => {
        if (this.props.isLogin) {
          this.props.navigateTo('HomeScreen');
        } else {
          this.props.goBack();
        }
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isButtonPressed = false;
        this.setState({ isLoading: false });
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  //Navigates to CameraRollScreen
  _onPressAddPhoto = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    ImagePicker.openPicker({
      height: 100,
      width: 100,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((medium) => {
      this.setState({ avatarMedium: medium });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Add media failed');
      amplitude.logEvent('Media - Add Media', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isButtonPressed = false;
    });
  }

  // Goes back if avatar hasn't changed, else upload image to AWS S3, changes user avatar, and then goes back
  _onPressDone = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    if (this.state.avatarMedium === this.existingAvatar) {
      this.props.goBack();
    } else {
      this.setState({ isLoading: true }, () => {
        this._setAvatarUrl(this.state.avatarMedium);
      });
    }
  }

  // Alerts when about to skip avatar selection (if isLogin)
  _onPressSkip = () => {
    RN.Alert.alert('', 'Are you sure you want to skip this step?',
      [{text: 'Cancel', style: 'cancel'},
       {text: 'Skip', onPress: () => this.props.navigateTo('HomeScreen')}],
    )
  }

  // Alerts when about to remove the avatar
  _onPressRemove = () => {
    RN.Alert.alert('', 'Are you sure you want to remove your profile photo?',
      [{text: 'Cancel', style: 'cancel'},
       {text: 'Remove', onPress: this._onConfirmRemove}],
    )
  }

  // Sets avatar to null
  _onConfirmRemove = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    this.setState({ isLoading: true }, () => {
      this._setAvatarUrl(null);
    });
  }

//--------------------------------------------------------------------//
// Render Methods
//--------------------------------------------------------------------//

  _renderTitle() {
    return (
      <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.regularBlackText18]}>
        Add Profile Photo
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text allowFontScaling={false} style={[UTILITY_STYLES.lightBlackText16, {marginTop: 5}, {marginBottom: 20}]}>
        Choose a photo that represents you.
      </RN.Text>
    )
  }

  _renderAvatar() {
    let avatar = this.state.avatarMedium;
    let avatarUrl = avatar ? (avatar.url || avatar.path) : null;

    return (
      <RN.TouchableOpacity onPress={this._onPressAddPhoto} disabled={!this.state.avatarMedium || this.state.isLoading}>
        <AvatarContainer userId={this.props.client.id} avatarSize={200} iconSize={75} avatarUrl={avatarUrl} frameBorderWidth={3} />
      </RN.TouchableOpacity>
    )
  }

  _renderChangePhotoText() {
    return (
      <RN.TouchableOpacity
        style={styles.skipButton}
        onPress={this._onPressAddPhoto}
        disabled={!this.state.avatarMedium || this.state.isLoading}
        >
        <RN.Text allowFontScaling={false} numberOfLines={1} style={[styles.skipButtonText, !this.state.avatarMedium && UTILITY_STYLES.transparentText]}>
          Change
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderNextButton() {
    let func;
    let buttonText;

    if (this.state.avatarMedium) {
      func = this._onPressDone;

      if (this.props.isLogin) {
        buttonText = 'Next';
      } else {
        buttonText = 'Done';
      }
    } else {
      func = this._onPressAddPhoto;
      buttonText = 'Add Photo';
    }

    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, {marginTop: 20}]}
        onPress={func}
        disabled={this.state.isLoading}
        >
        <RN.Text allowFontScaling={false} numberOfLines={1} style={UTILITY_STYLES.lightWhiteText18}>
          {buttonText}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderSkipButton() {
    let client = this.props.usersCache[this.props.client.id];
    let isUserWithAvatar = this.state.avatarMedium && this.state.avatarMedium.url;
    let text;
    let func;

    if (this.props.isLogin) {
      text = 'Skip';
      func = this._onPressSkip;
    } else {
      text = 'Remove';
      func = this._onPressRemove;
    }

    if (this.props.isLogin || isUserWithAvatar) {
      return (
        <RN.TouchableOpacity
          style={styles.skipButton}
          onPress={func}
          disabled={this.state.isLoading}
          >
          <RN.Text allowFontScaling={false} numberOfLines={1} style={styles.skipButtonText}>
            {text}
          </RN.Text>
        </RN.TouchableOpacity>
      )
    } else {
      return null;
    }
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading} />
    )
  }

  render() {
    return (
        <RN.View style={UTILITY_STYLES.containerStart}>
          <RN.View style={{flex: 1}} />
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderAvatar()}
          {this._renderChangePhotoText()}
          {this._renderNextButton()}
          {this._renderSkipButton()}
          {this._renderLoadingModal()}
          <RN.View style={{flex: 2}} />
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default AvatarScreen;
