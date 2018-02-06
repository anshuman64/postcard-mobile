// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import LoadingModal           from '../../components/loading_modal/loading_modal.js';
import { styles }             from './avatar_screen_styles.js';
import { UTILITY_STYLES }     from '../../utilities/style_utility.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class AvatarScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      imagePath:     null,
      imageType:     null,
      isLoading:     false,
      isNextPressed: true,
    };

    this.existingAvatar = null;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // If user has an avatar, get image and render it
  componentDidMount() {
    if (this.props.usersCache[this.props.client.id].avatar_url) {
      let avatarImageUrl = this.props.imagesCache[this.props.usersCache[this.props.client.id].avatar_url].url;

      this.setState({ imagePath: avatarImageUrl });
      this.existingAvatar = avatarImageUrl;
    }
  }

  // If getting imagePath prop from CameraRollScreen, update imagePath to new picture
  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Uploads image to AWS S3
  _uploadImage = (imagePath, imageType) => {
    this.props.uploadFile(this.props.client.authToken, this.props.client.firebaseUserObj, imagePath, imageType, this.props.client.id, 'profile_pictures/')
      .then((data) => {
        this._setAvatarUrl(data.key);
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          this.isNextPressed = false;
          defaultErrorAlert(error);
        });
      });
  }

  // Changes user avatar_url with key from AWS S3
  _setAvatarUrl = (imageKey) => {
    this.props.editAvatar(this.props.client.authToken, this.props.client.firebaseUserObj, imageKey)
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
        this.setState({ isLoading: false });
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  //Navigates to CameraRollScreen
  _onPressAddPhoto = () => {
    this.props.navigateTo('CameraRollScreen', { isAvatar: true });
  }

  // Goes back if avatar hasn't changed, else upload image to AWS S3, changes user avatar_url, and then goes back
  _onPressNextOrDone = () => {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

    if (this.state.imagePath === this.existingAvatar) {
      this.props.goBack();
    } else {
      this.setState({ isLoading: true }, () => {
        this._uploadImage(this.props.imagePath, this.props.imageType);
      });
    }
  }

  // Alerts when about to skip avatar selection (if isLogin) or remove the avatar
  _onPressSkipOrRemove = () => {
    if (this.props.isLogin) {
      RN.Alert.alert(
        '',
        'Are you sure you want to skip this step?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Skip', onPress: () => this.props.navigateTo('HomeScreen')},
        ],
      )
    } else {
      RN.Alert.alert(
        '',
        'Are you sure you want to remove your profile photo?',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Remove', onPress: this._onConfirmRemove},
        ],
      )
    }
  }

  // Sets avatar_url to null
  _onConfirmRemove = () => {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

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
      <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.marginTop5]}>
        Choose a photo that represents you.
      </RN.Text>
    )
  }

  _renderAvatar() {
    if (!this.props.usersCache[this.props.client.id].avatar_url && !this.state.imagePath) {
      return (
        <RN.View style={styles.frameBorder}>
          <Icon name='user' style={styles.userIcon} />
        </RN.View>
      )
    } else if (this.props.usersCache[this.props.client.id].avatar_url && !this.state.imagePath) {
      return null;
    } else {
      return (
        <RN.TouchableOpacity
          onPress={this._onPressAddPhoto}
          disabled={!this.state.imagePath || this.state.isLoading}
          >
          <RN.Image
            source={{uri: this.state.imagePath, cache: 'force-cache'}}
            style={styles.image}
            resizeMode={'cover'}
            onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, this.props.usersCache[this.props.client.id].avatar_url)}
            />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderChangePhotoText() {
    return (
      <RN.TouchableOpacity
        style={styles.skipButton}
        onPress={this._onPressAddPhoto}
        disabled={!this.state.imagePath || this.state.isLoading}
        >
        <RN.Text style={[styles.skipButtonText, !this.state.imagePath && UTILITY_STYLES.transparentText]}>
          Change
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, {marginTop: 25}]}
        onPress={this.state.imagePath ? this._onPressNextOrDone : this._onPressAddPhoto}
        disabled={this.state.isLoading}
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText18}>
          {this.state.imagePath ? (this.props.isLogin ? 'Next' : 'Done') : 'Add Photo'}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderSkipButton() {
    if (this.props.isLogin || this.props.usersCache[this.props.client.id].avatar_url) {
      return (
        <RN.TouchableOpacity
          style={styles.skipButton}
          onPress={this._onPressSkipOrRemove}
          disabled={this.state.isLoading}
          >
          <RN.Text style={styles.skipButtonText}>
            {this.props.isLogin ? 'Skip' : 'Remove'}
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
          <RN.View style={styles.frame}>
            {this._renderAvatar()}
          </RN.View>
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
