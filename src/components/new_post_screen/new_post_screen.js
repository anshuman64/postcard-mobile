// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';

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
    };
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

  render() {
    return (
      <RN.View style={ styles.container }>
        <HeaderContainer backIcon={true} shareButton={true} postText={this.state.postText} />
        {this._renderTextInput()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
