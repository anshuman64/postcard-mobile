// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Firebase    from 'react-native-firebase';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import { Actions } from 'react-native-router-flux';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }            from './menu_screen_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

class MenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _logOut = () => {
    Firebase.auth().signOut()
      .then(() => {
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
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          iconRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          textRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          iconRef.setNativeProps({style: styles.menuItemIcon})
          textRef.setNativeProps({style: styles.menuItemText})
        }}
        onPress={callback}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => iconRef = ref}
            name={iconName}
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => textRef = ref} style={styles.menuItemText}>
            {text}
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderButton('envelope', 'Contact', this.contactIcon, this.contactText, () => RN.Linking.openURL('mailto:contact@insiya.io'))}
        {this._renderButton('paper-plane', 'Telegram Community', this.telegramIcon, this.telegramText, () => RN.Linking.openURL('https://t.me/insiyaapp'))}
        {this._renderButton('docs', 'Terms of Use', this.termsIcon, this.termsText, () => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-de17e7b76742'))}
        {this._renderButton('lock', 'Privacy Policy', this.privacyIcon, this.privacyText, () => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-a18b33e9d916'))}
        {this._renderButton('people', 'Community Guidelines', this.communityIcon, this.community, () => RN.Linking.openURL('mailto:contact@insiya.io'))}
        {this._renderButton('logout', 'Log Out', this.logOutIcon, this.logOutText, this._logOut)}
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
