// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }            from './avatar_screen_styles.js';
import { uploadImageFile }   from '../../utilities/file_utility.js';
import { setStateCallback }  from '../../utilities/function_utility.js';
import { COLORS }            from '../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';


//--------------------------------------------------------------------//

class AvatarScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      imagePath:     null,
      imageType:     null,
      isError:       false,
      isLoading:     false,
      isNextPressed: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }


  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _uploadImage(imagePath, imageType) {
    uploadImageFile(this.props.firebaseUserObj, this.props.refreshAuthToken, imagePath, imageType, this.props.user.id, 'profile_pictures/')
      .then((data) => {
        this._setAvatarUrl(data.key);
      })
      .catch((error) => {
        this.isNextPressed = false;
        this.setState({ isLoading: false });
        defaultErrorAlert(error);
      })
  }

  _setAvatarUrl(imageKey) {
    this.props.editAvatar(this.props.authToken, this.props.firebaseUserObj, imageKey)
      .then(() => {
        this.props.goBack();
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }


  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddPhoto = () => {
    this.props.navigateTo('CameraRollScreen', { isAvatar: true });
  }

  _onPressNext = () => {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

    this.setState({ isLoading: true }, () => {
      this._uploadImage(this.props.imagePath, this.props.imageType);
    });
  }

  _onPressSkip = () => {
    RN.Alert.alert(
      '',
      'Are you sure you want to skip this step?',
      [
        {text: 'Cancel', onPress: () => null, style: 'cancel'},
        {text: 'Skip', onPress: this._onConfirmSkip},
      ],
    )
  }

  _onConfirmSkip = () => {
    this.props.navigateTo('HomeScreen');
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
    if (!this.state.imagePath) {
      return (
        <RN.View style={styles.frame}>
          <Icon name='user' style={styles.placeholderImage} />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.frame}>
          <RN.Image source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'contain'} />
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

  //TODO: create utility component shared with LoginScreen
  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={styles.nextButtonBackground}
        onPress={this.state.imagePath ? this._onPressNext : this._onPressAddPhoto}
        disabled={this.state.isLoading}
        >
        { this.state.isLoading ?
          <RN.ActivityIndicator size='small' color={COLORS.grey400} /> :
          <RN.Text style={styles.nextButtonText}>
            {this.state.imagePath ? (this.props.isLogin ? 'Next' : 'Done') : 'Add Photo'}
          </RN.Text>
        }
      </RN.TouchableOpacity>
    )
  }

  _renderSkipButton() {
    if (this.props.isLogin) {
      return (
        <RN.TouchableOpacity
          style={styles.skipButton}
          onPress={this._onPressSkip}
          disabled={this.state.isLoading}
          >
          <RN.Text style={ styles.skipButtonText }>
            {"Skip"}
          </RN.Text>
        </RN.TouchableOpacity>
      )
    }
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
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default AvatarScreen;
