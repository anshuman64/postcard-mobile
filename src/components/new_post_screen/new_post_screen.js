// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }  from './new_post_screen_styles.js';
import { goBack }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class NewPostScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      headerRight: <RN.Text style={styles.shareButtonText} onPress={() => params.onPressShare}>Share</RN.Text>,
      headerLeft: <Ionicon name='ios-arrow-round-back' onPress={() => navigation.dispatch(goBack())} style={styles.backIcon}/>
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      isBackIconPressed:  false,
      postText:           '',
    };

    this._onPressShare = this._onPressShare.bind(this);
  }

  componentDidMount() {
    this.props.navigation.setParams({ onPressShare: this._onPressShare });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Callback function to return to login screen
  _onBackIconPress() {
    //Debug test
    this.props.navigation.dispatch(goBack());

    // Real
    // this.props.navigation.dispatch(goBack());
  }

  _onChangeText(value) {
    this.setState({ postText: value })
  }

  _onPressShare() {
    this.props.createPost(this.props.authToken, this.state.postText);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderTextInput() {
    return (
      <RN.TextInput
        style={ styles.textInput }
        placeholderTextColor={'#bdbdbd'}
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
        {this._renderTextInput()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default NewPostScreen;
