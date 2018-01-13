// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';
import EvilIcon  from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer      from '../../components/nav_bar_header/header_container.js';
import { styles }           from './new_post_screen_styles.js';
import { setStateCallback } from '../../utilities/function_utility.js';
import { COLORS }           from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postText:  '',
      imagePath: null,
      imageType: null
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

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
        placeholderTextColor={COLORS.grey500}
        placeholder={'How are you?'}
        onChangeText={this._onChangeText.bind(this)}
        value={this.state.postText}
        autoFocus={true}
        multiline={true}
        returnKeyType={'done'}
        underlineColorAndroid={'transparent'}
        />
    )
  }

// TODO: make X button pretty
  _renderImage() {
    if (this.state.imagePath) {
      return (
        <RN.ImageBackground source={{uri: this.state.imagePath}} style={styles.image} resizeMode={'contain'} >
          <EvilIcon name='close' style={styles.closeIcon} onPress={setStateCallback(this, {image: null})}/>
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
        <HeaderContainer backIcon={true} shareButton={true} postText={this.state.postText} imagePath={this.state.imagePath} imageType={this.state.imageType}/>
        {this._renderTextInput()}
        {this._renderImage()}
        {this._renderImageButton()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
