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


  render() {
    return (
      <RN.View style={ styles.container }>
        <HeaderContainer backIcon={true} shareButton={true} postText={this.state.postText} />
        <RN.TextInput
          style={[styles.textInput, this.state.postText.length > 85 && styles.smallBodyText]}
          placeholderTextColor={COLORS.grey400}
          placeholder={'What was your happiest moment?'}
          onChangeText={(value) => this._onChangeText(value)}
          autoFocus={true}
          multiline={true}
          returnKeyType={'done'}
          underlineColorAndroid={'transparent'}
          />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
