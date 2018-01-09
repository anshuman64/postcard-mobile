// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';
import EvilIcon  from 'react-native-vector-icons/EvilIcons';

// Local Imports
import HeaderContainer  from '../nav_bar/header/header_container.js';
import { styles }       from './new_post_screen_styles.js';
import { COLORS }       from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      postText: '',
      image: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.image) {
      this.setState({image: nextProps.image})
    }
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onChangeText(value) {
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
        onChangeText={(value) => this._onChangeText(value)}
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
    if (this.state.image) {
      return (
        <RN.ImageBackground source={{uri: this.state.image.image ? this.state.image.image.uri : this.state.image.path}} style={styles.image} resizeMode={'contain'} >
          <EvilIcon name='close' style={styles.closeIcon} onPress={() => this.setState({image: null})}/>
        </RN.ImageBackground>
      )
    }
  }

  _renderImageButton() {
    return (
      <RN.View style={styles.imageButtonView}>
        <RN.TouchableOpacity style={styles.imageButtonView} onPress={() => this.props.navigateTo('CameraRollScreen')}>
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
        <HeaderContainer backIcon={true} shareButton={true} postText={this.state.postText} image={this.state.image}/>
        {this._renderTextInput()}
        {this._renderImage()}
        {this._renderImageButton()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
