// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Firebase    from 'react-native-firebase';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import { Actions } from 'react-native-router-flux';

// Local Imports
import MenuListItem          from '../../components/menu_list_item/menu_list_item';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import { defaultErrorAlert } from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class MenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _logOut = () => {
    Firebase.auth().signOut()
      .then(() => {
        AWS.config.credentials.clearCachedId();
        AWS.config.credentials = null;
        Actions.reset('WelcomeScreen');
      })
      .catch((error) => {
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(iconName, text, iconRef, textRef, callback) {
    return (
      <MenuListItem iconName={iconName} text={text} iconRef={iconRef} textRef={textRef} callback={callback}/>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <MenuListItem iconName={'envelope'}    text={'Contact'}              callback={() => RN.Linking.openURL('mailto:contact@insiya.io')}/>
        <MenuListItem iconName={'paper-plane'} text={'Telegram Community'}   callback={() => RN.Linking.openURL('https://t.me/insiyaapp')}/>
        <MenuListItem iconName={'docs'}        text={'Terms of Use'}         callback={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-de17e7b76742')}/>
        <MenuListItem iconName={'lock'}        text={'Privacy Policy'}       callback={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-a18b33e9d916')}/>
        <MenuListItem iconName={'people'}      text={'Community Guidelines'} callback={() => RN.Linking.openURL('mailto:contact@insiya.io')}/>
        <MenuListItem iconName={'logout'}      text={'Log Out'}              callback={this._logOut}/>
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
