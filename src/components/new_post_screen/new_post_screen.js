// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }  from './new_post_screen_styles.js';
import { COLORS }  from '../../utilities/style_utility.js';
import { goBack }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed:  false,
      postText:           '',
    };

    this._onPressShare = this._onPressShare.bind(this);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Callback function to return to login screen
  _onBackIconPress() {
    this.props.navigation.dispatch(goBack());
  }

  _onChangeText(value) {
    this.setState({ postText: value })
  }

  _onPressShare = () => {
    this.props.createPost(this.props.authToken, { body: this.state.postText })
      .then(() => {
        this.props.navigation.dispatch(goBack());
      })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <RN.View style={styles.header}>
        <Ionicon name='ios-arrow-round-back' onPress={() => this.props.navigation.dispatch(goBack())} style={styles.backIcon}/>
        <RN.Text style={styles.shareButtonText} onPress={() => this._onPressShare()}>Share</RN.Text>
      </RN.View>
    )
  }

  _renderTextInput() {
    return (
      <RN.TextInput
        style={ styles.textInput }
        placeholderTextColor={COLORS.grey400}
        placeholder={'What are you thankful for today?'}
        onChangeText={(value) => this._onChangeText(value)}
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
        {this._renderHeader()}
        {this._renderTextInput()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
