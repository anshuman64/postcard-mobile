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
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.contactIcon = null;
    this.contactText = null;
  }

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
          this.iconRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.textRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.iconRef.setNativeProps({style: styles.menuItemIcon})
          this.textRef.setNativeProps({style: styles.menuItemText})
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

  _renderTelegramButton() {
    return (
      <RN.TouchableWithoutFeedback
      onPressIn={() => {
        this.telegramIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        this.telegramText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
      }}
      onPressOut={() => {
        this.telegramIcon.setNativeProps({style: styles.menuItemIcon})
        this.telegramText.setNativeProps({style: styles.menuItemText})
      }}
        onPress={() => RN.Linking.openURL('https://t.me/insiyaapp')}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.telegramIcon = ref}
            name='paper-plane'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.telegramText = ref} style={styles.menuItemText}>
            Telegram Community
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderTermsButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.termsIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.termsText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.termsIcon.setNativeProps({style: styles.menuItemIcon})
          this.termsText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-de17e7b76742')}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.termsIcon = ref}
            name='docs'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.termsText = ref} style={styles.menuItemText}>
            Terms Of Use
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderPrivacyPolicyButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.privacyIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.privacyText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.privacyIcon.setNativeProps({style: styles.menuItemIcon})
          this.privacyText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-a18b33e9d916')}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.privacyIcon = ref}
            name='lock'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.privacyText = ref} style={styles.menuItemText}>
            Privacy Policy
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderCommunityGuidelinesButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.communityIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.communityText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.communityIcon.setNativeProps({style: styles.menuItemIcon})
          this.communityText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/community-guidelines-598b3fd77a2e')}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.communityIcon = ref}
            name='people'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.communityText = ref} style={styles.menuItemText}>
            Community Guidelines
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderLogOutButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.logOutIcon.setNativeProps({style: UTILITY_STYLES.textRed})
          this.logOutText.setNativeProps({style: UTILITY_STYLES.textRed})
        }}
        onPressOut={() => {
          this.logOutIcon.setNativeProps({style: styles.menuItemIcon})
          this.logOutText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={this._logOut}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.logOutIcon = ref}
            name='logout'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.logOutText = ref} style={styles.menuItemText}>
            Log Out
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }



  _renderContactButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.contactIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.contactText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.contactIcon.setNativeProps({style: styles.menuItemIcon})
          this.contactText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.contactIcon = ref}
            name='envelope'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.contactText = ref} style={styles.menuItemText}>
            Contact
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderButton('envelope', 'Contact', this.contactIcon, this.contactText, () => RN.Linking.openURL('mailto:contact@insiya.io') )}
        {this._renderTelegramButton()}
        {this._renderTermsButton()}
        {this._renderPrivacyPolicyButton()}
        {this._renderCommunityGuidelinesButton()}
        {this._renderLogOutButton()}
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
