// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';
import EvilIcon  from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer                    from '../../components/nav_bar_header/header_container.js';
import { POST_PLACEHOLDERS }              from '../../utilities/new_post_utility.js';
import { styles }                         from './new_post_screen_styles.js';
import { getRandomInt, setStateCallback } from '../../utilities/function_utility.js';
import { COLORS }                         from '../../utilities/style_utility.js';

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

  componentDidMount() {
    this.setState({ placeholderText: POST_PLACEHOLDERS[getRandomInt(POST_PLACEHOLDERS.length)]})
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.imagePath) {
      this.setState({ imagePath: nextProps.imagePath, imageType: nextProps.imageType })
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onChangeText = (value) => {
    this.setState({ postText: value })
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
        onChangeText={this._onChangeText.bind(this)}
        value={this.state.postText}
        autoFocus={true}
        multiline={true}
        returnKeyType={'done'}
        underlineColorAndroid={'transparent'}
        />
    )
  }

  _renderImage() {
    if (this.state.imagePath) {
      return (
        <RN.ImageBackground source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'cover'} >
          <RN.TouchableWithoutFeedback style={styles.closeButton} onPress={setStateCallback(this, { imagePath: null, imageType: null })} >
            <RN.View style={styles.closeButtonBackground} >
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
      <RN.View style={ styles.container }>
        <HeaderContainer backIcon={true} backTitle={'Create Post'} shareButton={true} postText={this.state.postText} placeholderText={this.state.placeholderText} imagePath={this.state.imagePath} imageType={this.state.imageType}/>
        {this._renderTextInput()}
        {this._renderImage()}
        {this._renderImageButton()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
