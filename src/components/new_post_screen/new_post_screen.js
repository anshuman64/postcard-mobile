// Library Imports
import React                                                                     from 'react';
import { Button, StyleSheet, Text, View, TouchableWithoutFeedback, TextInput }   from 'react-native';
import { connect }                                                               from 'react-redux';
import Icon                                                                      from 'react-native-vector-icons/Ionicons';

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
    this.props.navigation.dispatch(toBackScreen());
  }

  // Callback function when text is inputted
  _onChangeText(value) {
    this.setState({ postText: value })
  }

  // TODO: Callback function when "Share" button is pressed
  _onPressShare() {
    this.props.createPost(this.state.postText);
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={[styles.headerView]}>
          {/* Back Button */}
          <TouchableWithoutFeedback
            onPressIn={this._setStateInAnimationFrame({ isBackIconPressed: true})}
            onPressOut={this._setStateInAnimationFrame({ isBackIconPressed: false})}
            onPress={() => this._onBackIconPress()}
            >
             <Icon name='ios-arrow-round-back-outline' style={[styles.backIcon, this.state.isBackIconPressed && styles.textHighlighted]} />
         </TouchableWithoutFeedback>

         {/* Share Button */}
          <Text
            onPress={() => this._onBackIconPress()}
            style={[styles.postButtonText]}
            >
            Share
          </Text>
       </View>
       
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
