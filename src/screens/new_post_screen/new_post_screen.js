// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Ionicon     from 'react-native-vector-icons/Ionicons';
import EvilIcon    from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer                    from '../../components/header/header_container';
import { styles }                         from './new_post_screen_styles';
import { getRandomInt, setStateCallback } from '../../utilities/function_utility';
import { postPlaceholders }              from '../../utilities/file_utility';
import { UTILITY_STYLES, COLORS }         from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class NewPostScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postText:        '',
      placeholderText: '',
      imagePath:       null,
      imageType:       null,
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

  // If selected image from CameraRollScreen, adds image
  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
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

  _renderImageButton() {
    return (
      <RN.View style={styles.imageButtonView}>
        <RN.TouchableOpacity style={styles.imageButtonView} onPress={() => this.props.navigateTo('CameraRollScreen', { isAvatar: false })}>
          <Ionicon name='md-images' style={styles.imageButtonIcon} />
          <RN.Text style={styles.imageButtonText}>
            Photos
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
              imagePath={this.state.imagePath}
              imageType={this.state.imageType}
              />
            {this._renderTextInput()}
            {this._renderImage()}
            {this._renderImageButton()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.KeyboardAvoidingView>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
