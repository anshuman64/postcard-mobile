// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// Local Imports
import LoadingModal                   from '../../components/loading_modal/loading_modal.js';
import { styles }                     from './avatar_screen_styles.js';
import { getImage, uploadImageFile }  from '../../utilities/file_utility.js';
import { setStateCallback }           from '../../utilities/function_utility.js';
import { COLORS }                     from '../../utilities/style_utility.js';
import { defaultErrorAlert }          from '../../utilities/error_utility.js';


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
      isError:       false,
      isLoading:     false,
      isNextPressed: true,
    };

    this.existingAvatar = null;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.user.avatar_url) {
      getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.user.avatar_url)
        .then((data) => {
          this.setState({ imagePath: data });
          this.existingAvatar = data;
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _uploadImage = (imagePath, imageType) => {
    uploadImageFile(this.props.firebaseUserObj, this.props.refreshAuthToken, imagePath, imageType, this.props.user.id, 'profile_pictures/')
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

  _setAvatarUrl = (imageKey) => {
    this.props.editAvatar(this.props.authToken, this.props.firebaseUserObj, imageKey)
      .then(() => {
        this.setState({ isLoading: false }, () => {
          this.props.goBack();
        });
      })
      .catch((error) => {
        this.setState({ isLoading: false }, () => {
          defaultErrorAlert(error);
        });
      });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  //TODO: let users remove their profile picture
  _onPressAddPhoto = () => {
    this.props.navigateTo('CameraRollScreen', { isAvatar: true });
  }

  _onPressNext = () => {
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

  _onPressSkip = () => {
    if (this.props.isLogin) {
      RN.Alert.alert(
        '',
        'Are you sure you want to skip this step?',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'Skip', onPress: this._onConfirmSkip},
        ],
      )
    } else {
      RN.Alert.alert(
        '',
        'Are you sure you want to remove your profile photo?',
        [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'Remove', onPress: this._onConfirmRemove},
        ],
      )
    }
  }

  _onConfirmSkip = () => {
    this.props.navigateTo('HomeScreen');
  }

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
      <RN.Text style={styles.titleText}>
        Add profile photo
      </RN.Text>
    )
  }

  _renderSubtitle() {
    return (
      <RN.Text style={styles.subtitleText}>
        Add a profile photo that represents you
      </RN.Text>
    )
  }

  _renderAvatar() {
    if (!this.props.user.avatar_url && !this.state.imagePath) {
      return (
        <RN.View style={styles.frame}>
          <FontAwesome name='user-circle-o' style={styles.userIcon} />
        </RN.View>
      )
    } else if (this.props.user.avatar_url && !this.state.imagePath) {
      return (
        <RN.View style={styles.frame} />
      )
    } else {
      return (
        <RN.View style={styles.frame}>
          <RN.TouchableOpacity
            onPress={this._onPressAddPhoto}
            disabled={!this.state.imagePath || this.state.isLoading}
            >
            <RN.Image source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'cover'} />
          </RN.TouchableOpacity>
        </RN.View>
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
        <RN.Text style={[styles.skipButtonText, !this.state.imagePath && styles.transparentText]}>
          Change
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={styles.nextButtonBackground}
        onPress={this.state.imagePath ? this._onPressNext : this._onPressAddPhoto}
        disabled={this.state.isLoading}
        >
        <RN.Text style={styles.nextButtonText}>
          {this.state.imagePath ? (this.props.isLogin ? 'Next' : 'Done') : 'Add Photo'}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderSkipButton() {
    if (this.props.isLogin || this.props.user.avatar_url) {
      return (
        <RN.TouchableOpacity
          style={styles.skipButton}
          onPress={this._onPressSkip}
          disabled={this.state.isLoading}
          >
          <RN.Text style={ styles.skipButtonText }>
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
        <RN.View style={styles.container}>
          {this._renderTitle()}
          {this._renderSubtitle()}
          {this._renderAvatar()}
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
