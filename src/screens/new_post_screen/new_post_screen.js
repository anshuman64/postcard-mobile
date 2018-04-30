// Library Imports
import React       from 'react';
import RN          from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcon    from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer                    from '../../components/header/header_container';
import { styles }                         from './new_post_screen_styles';
import { getRandomInt, setStateCallback } from '../../utilities/function_utility';
import { postPlaceholders }               from '../../utilities/file_utility';
import { UTILITY_STYLES, COLORS }         from '../../utilities/style_utility';

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
      placeholderText: '',
      photos:          null,
      videos:          null,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Sets placeholderText as a random string from placeholders.csv from S3 bucket
  componentDidMount() {
    if (postPlaceholders) {
      this.setState({ placeholderText: postPlaceholders[getRandomInt(postPlaceholders.length)] });
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _onPressAddPhotos = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      maxFiles: 20,
      includeBase64: true,
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((photos) => {
      console.log(photos);
      this.setState({ photos: photos });
    })
    .catch((error) => {
      // console.log(error); // Debug Test
      this.isImagePressed = false;
    });
  }

  _onPressAddVideo = () => {
    ImagePicker.openPicker({
      mediaType: 'video',
      multiple: true,
      includeBase64: true,
      showCropGuidelines: false,
      hideBottomControls: true,
      cropperToolbarColor: 'black',
    })
    .then((videos) => {
      console.log(videos)
      this.setState({ videos: videos });
    })
    .catch((error) => {
      // console.log(error); // Debug Test
      this.isImagePressed = false;
    });
  }

  _onPressTakePhoto = () => {
    ImagePicker.openCamera({
    }).then(image => {
      console.log(image);
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
        placeholder={this.state.placeholderText}
        onChangeText={(value) => this.setState({ postText: value })}
        value={this.state.postText}
        autoFocus={true}
        multiline={true}
        returnKeyType={RN.Platform.OS === 'ios' ? null : 'done'}
        underlineColorAndroid={'transparent'}
        />
    )
  }

  _renderImage() {
    if (this.state.imagePath) {
      return (
        <RN.ImageBackground source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'contain'}>
          <RN.TouchableWithoutFeedback style={styles.closeButton} onPress={setStateCallback(this, { imagePath: null, imageType: null })}>
            <RN.View style={styles.closeButtonBackground}>
              <EvilIcon name='close' style={styles.closeIcon} />
            </RN.View>
          </RN.TouchableWithoutFeedback>
        </RN.ImageBackground>
      )
    }
  }

  _renderButton(text, iconName, callback) {
    return (
      <RN.View style={styles.buttonView}>
        <RN.TouchableOpacity style={styles.buttonView} onPress={callback}>
          <Icon name={iconName} style={styles.buttonIcon} />
          <RN.Text style={styles.buttonText}>
            {text}
          </RN.Text>
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
              />
            {this._renderTextInput()}
            {this._renderImage()}
            {this._renderButton('Add Photos', 'picture', this._onPressAddPhotos)}
            {this._renderButton('Add Video', 'camrecorder', this._onPressAddVideo)}
            {this._renderButton('Take Picture', 'camera', this._onPressTakePhoto)}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
