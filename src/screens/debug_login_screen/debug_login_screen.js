// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { POST_TYPES }       from '../../actions/post_actions';
import { FRIEND_TYPES }     from '../../actions/friendship_actions';
import { setStateCallback } from '../../utilities/function_utility';
import { styles }           from './debug_login_screen_styles';
import { UTILITY_STYLES }   from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class DebugLoginScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'test2@insiya.io',
      passwordInput:  'socialnetwork',
    };

    this.isNextPressed = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress = () => {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

    this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
      .then(() => {
        this._getPosts();
        this._loadData()
          .then(() => {
            let client = this.props.usersCache[this.props.client.id];

            if (client && client.username) {
              return this.props.navigateTo('HomeScreen');
            } else {
              return this.props.navigateTo('UsernameScreenLogin');
            }
          })
          .catch((error) => {
            // console.error(error); // Debug Test
          })
      })
      .catch((error) => {
        // console.error(error); // Debug Test
        this.isNextPressed = false;
      });
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _getPosts = () => {
    for (let postType in POST_TYPES) {
      this.props.getPosts(this.props.client.authToken, this.props.client.firebaseUserObj, true, this.props.client.id, POST_TYPES[postType], true);
    }
  }

  async _loadData()  {
    for (let friendType in FRIEND_TYPES) {
      await this.props.getFriendships(this.props.client.authToken, this.props.client.firebaseUserObj, FRIEND_TYPES[friendType]);
    }

    await this.props.getBlockedUsers(this.props.client.authToken, this.props.client.firebaseUserObj);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={styles.topView}>
        <RN.Image
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
      </RN.View>
    )
  }

  _renderEmailInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.emailInput}
        underlineColorAndroid={'transparent'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => this.setState({ emailInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={[UTILITY_STYLES.nextButtonBackground, UTILITY_STYLES.marginTop50]}
        onPress={this._onNextButtonPress}
        underlayColor={'#0050a7'}
        >
        <RN.Text style={UTILITY_STYLES.lightWhiteText16}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderLogo()}
        <RN.View style={styles.bottomView}>
          {this._renderEmailInput()}
          {this._renderPasswordInput()}
          {this._renderNextButton()}
        </RN.View>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default DebugLoginScreen;
