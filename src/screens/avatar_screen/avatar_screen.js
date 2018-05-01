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
  // componentDidMount() {
  //   let client = this.props.usersCache[this.props.client.id];
  //
  //   if (client && client.avatar_medium) {
  //     let avatarImageUrl = this.props.mediaCache[client.avatar_url].url;
  //
  //     this.setState({ avatarMedium: avatarImageUrl });
  //     this.existingAvatar = avatarImageUrl;
  //   }
  // }

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
      height: 400,
      width: 400,
      cropping: true,
      cropperCircleOverlay: true,
      mediaType: 'photo',
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((medium) => {
      this.setState({ avatarMedium: medium, });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Add media failed');
      amplitude.logEvent('Media - Add Media', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isButtonPressed = false;
    });
  }

  // Goes back if avatar hasn't changed, else upload image to AWS S3, changes user avatar_url, and then goes back
  // TODO: wtf is this??
  _onPressNextOrDone = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    if (this.state.avatarMedium === this.existingAvatar) {
      this.props.goBack();
    } else {
      this.setState({ isLoading: true }, () => {
        this._setAvatarUrl(this.props.avatarMedium, this.props.imageType);
      });
    }
  }

  // Alerts when about to skip avatar selection (if isLogin) or remove the avatar
  _onPressSkipOrRemove = () => {
    if (this.props.isLogin) {
      RN.Alert.alert('', 'Are you sure you want to skip this step?',
        [{text: 'Cancel', style: 'cancel'},
         {text: 'Skip', onPress: () => this.props.navigateTo('HomeScreen')}],
      )
    } else {
      RN.Alert.alert('', 'Are you sure you want to remove your profile photo?',
        [{text: 'Cancel', style: 'cancel'},
         {text: 'Remove', onPress: this._onConfirmRemove}],
      )
    }
  }

  // Sets avatar_url to null
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
      <RN.Text style={[UTILITY_STYLES.regularBlackText18, UTILITY_STYLES.marginTop50]}>
        Add Profile Photo
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.marginTop5, {marginBottom: 25}]}>
        Choose a photo that represents you.
      </RN.Text>
    )
  }

  _renderChangePhotoText() {
    return (
      <RN.TouchableOpacity
        style={styles.skipButton}
        onPress={this._onPressAddPhoto}
        disabled={!this.state.avatarMedium || this.state.isLoading}
        >
        <RN.Text style={[styles.skipButtonText, !this.state.avatarMedium && UTILITY_STYLES.transparentText]}>
          Change
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderNextButton() {
    let onPressFunction = this.state.avatarMedium ? this._onPressNextOrDone : this._onPressAddPhoto;
    let buttonText;

    if (this.state.avatarMedium) {
      if (this.props.isLogin) {
        buttonText = 'Next';
      } else {
        buttonText = 'Done';
      }
    } else {
      buttonText = 'Add Photo';
    }

    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, {marginTop: 25}]}
        onPress={onPressFunction}
        disabled={this.state.isLoading}
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText18}>
          {buttonText}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderSkipButton() {
    let client = this.props.usersCache[this.props.client.id];
    let avatarUrl = client ? client.avatar_url : null;
    let skipText = this.props.isLogin ? 'Skip' : 'Remove';

    if (this.props.isLogin || avatarUrl) {
      return (
        <RN.TouchableOpacity
          style={styles.skipButton}
          onPress={this._onPressSkipOrRemove}
          disabled={this.state.isLoading}
          >
          <RN.Text style={styles.skipButtonText}>
            {skipText}
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
          {this._renderTitle()}
          {this._renderSubtitle()}
          <RN.TouchableOpacity onPress={this._onPressAddPhoto} disabled={!this.state.avatarMedium || this.state.isLoading}>
            <AvatarContainer userId={this.props.client.id} avatarSize={200} iconSize={75} avatarUrl={this.state.avatarMedium} frameBorderWidth={3} />
          </RN.TouchableOpacity>
          {this._renderChangePhotoText()}
          {this._renderNextButton()}
          {this._renderSkipButton()}
          {this._renderLoadingModal()}
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default AvatarScreen;
