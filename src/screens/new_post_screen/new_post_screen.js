// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer                            from '../../components/header/header_container';
import { styles }                                 from './new_post_screen_styles';
import { getRandomInt, setStateCallback }         from '../../utilities/function_utility';
import { UTILITY_STYLES, COLORS }                 from '../../utilities/style_utility';
import { setErrorDescription, defaultErrorAlert } from '../../utilities/error_utility';
import { amplitude }                              from '../../utilities/analytics_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class NewPostScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postText:        '',
      photos:          [],
      videos:          [],
      takePhoto:       []
    };

    this.isButtonPressed = false;
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _onPressAddPhotos = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 10,
      compressImageMaxHeight: 512,
      compressImageMaxWidth: 512,
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((photos) => {
      this.setState({ photos: photos });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Add photos failed');
      amplitude.logEvent('Media - Add Photos', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isButtonPressed = false;
    });
  }

  _onPressAddVideo = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true,
      maxFiles: 1,
      compressImageMaxHeight: 512,
      compressImageMaxWidth: 512,
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((videos) => {
      this.setState({ videos: videos });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Add video failed');
      amplitude.logEvent('Media - Add Video', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isButtonPressed = false;
    });
  }

  _onPressTakePhoto = () => {
    if (this.isButtonPressed) {
      return;
    }

    this.isButtonPressed = true;

    ImagePicker.openCamera({
      compressImageMaxHeight: 512,
      compressImageMaxWidth: 512,
    })
    .then((photo) => {
      this.setState({ takePhoto: [photo] });
    })
    .catch((error) => {
      error = setErrorDescription(error, 'Take photo failed');
      amplitude.logEvent('Media - Take Photo', { is_successful: false, error_description: error.description, error_message: error.message });
    })
    .finally(() => {
      this.isButtonPressed = false;
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTextInput() {
    return (
      <RN.TextInput
        style={[styles.textInput, this.state.postText.length >= 86 && styles.smallBodyText]}
        placeholderTextColor={COLORS.grey400}
        placeholder={'What would you like to share?'}
        onChangeText={(value) => this.setState({ postText: value })}
        value={this.state.postText}
        autoFocus={true}
        multiline={true}
        returnKeyType={RN.Platform.OS === 'ios' ? null : 'done'}
        underlineColorAndroid={'transparent'}
        />
    )
  }

  _renderButton(type) {
    let text;
    let iconName;
    let buttonCallback;
    let numAttached;
    let closeCallback;

    if (type === 'photos') {
      text = 'Add Photos';
      iconName = 'picture';
      buttonCallback = this._onPressAddPhotos;
      numAttached = this.state.photos.length;
      closeCallback = setStateCallback(this, { photos: [] });
    } else if (type === 'videos') {
      text = 'Add Video';
      iconName = 'camrecorder';
      buttonCallback = this._onPressAddVideo;
      numAttached = this.state.videos.length;
      closeCallback = setStateCallback(this, { videos: [] });
    } else if (type === 'takePhoto') {
      text = 'Take Photo';
      iconName = 'camera';
      buttonCallback = this._onPressTakePhoto;
      numAttached = this.state.takePhoto.length;
      closeCallback = setStateCallback(this, { takePhoto: [] });
    }

    return (
      <RN.View style={styles.buttonView}>
        <RN.TouchableOpacity style={styles.buttonView} onPress={buttonCallback}>
          <Icon name={iconName} style={styles.buttonIcon} />
          <RN.Text allowFontScaling={false} numberOfLines={1} style={[UTILITY_STYLES.lightBlackText16, styles.buttonText]}>
            {text}
          </RN.Text>
          {numAttached > 0 ?
            <RN.TouchableOpacity style={styles.buttonView} onPress={closeCallback}>
              <Icon name={'close'} style={styles.closeIcon} />
              <RN.Text allowFontScaling={false} numberOfLines={1} style={[UTILITY_STYLES.regularBlackText16, UTILITY_STYLES.textRed, styles.messageText]}>
                {numAttached + ' Attached'}
              </RN.Text>
            </RN.TouchableOpacity> :
            null
          }
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.KeyboardAvoidingView behavior={RN.Platform.OS === 'ios' ? 'padding' : null}>
        <RN.TouchableWithoutFeedback onPress={RN.Keyboard.dismiss} accessible={false}>
          <RN.View style={UTILITY_STYLES.containerStart}>
            <HeaderContainer
              backIcon={true}
              backTitle={'Create Post'}
              nextButton={true}
              postText={this.state.postText}
              placeholderText={this.state.placeholderText}
              photos={this.state.photos}
              videos={this.state.videos}
              takePhoto={this.state.takePhoto}
              />
            {this._renderTextInput()}
            {this._renderButton('photos')}
            {this._renderButton('videos')}
            {this._renderButton('takePhoto')}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
