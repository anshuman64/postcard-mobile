// Library Imports
import React                                                            from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, TextInput }  from 'react-native';
import Icon                                                             from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles, scaleFactor }  from './new_post_screen_styles.js';
import { toBackScreen }         from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed: false,
      postText: '',
    };

    this._onPressShare = this._onPressShare.bind(this);
  }

  // Callback function for setting state in animation frame; recommended by React Native docs for animations
  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  // Callback function to return to login screen
  _onBackIconPress() {
    //Debug test
    this.props.navigation.dispatch(toBackScreen());

    // Real
    // this.props.navigation.dispatch(toBackScreen());
  }

  _onChangeText(value) {
    this.setState({ postText: value })
  }

  _onPressShare() {
    this.props.createPost(this.state.postText);
  }

  render() {
    return (
      <View style={[styles.container]}>
        {/* Text Input */}
        <TextInput
          style={[styles.textInput]}
          placeholderTextColor={'#bdbdbd'}
          placeholder={'What are you thankful for today?'}
          onChangeText={(value) => this._onChangeText(value)}
          autoFocus={true}
          multiline={true}
          returnKeyType={'done'}
          underlineColorAndroid={'transparent'}
          style={[styles.textInput]}
          />
      </View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
