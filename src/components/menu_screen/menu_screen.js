// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import HeaderContainer from '../header/header_container.js';
import { styles }      from './menu_screen_styles.js';

//--------------------------------------------------------------------//

class MenuScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressSupport() {
    RN.Linking.openURL('mailto:support@insiya.io');
  }

  _onPressFeedback() {
    RN.Linking.openURL('mailto:feedback@insiya.io');
  }

  _onPressAbout() {

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <HeaderContainer navigation={this.props.navigation} backIcon={true} />
    )
  }

  _renderSupportButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.supportIcon.setNativeProps({style: styles.textHighlighted})
          this.supportText.setNativeProps({style: styles.textHighlighted})
        }}
        onPressOut={() => {
          this.supportIcon.setNativeProps({style: styles.menuItemIcon})
          this.supportText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={() => this._onPressSupport()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            ref={(ref) => this.supportIcon = ref}
            name='envelope'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.supportText = ref} style={styles.menuItemText}>
            Support
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderFeedbackButton() {
    return (
      <RN.TouchableWithoutFeedback
      onPressIn={() => {
        this.supportIcon.setNativeProps({style: styles.textHighlighted})
        this.supportText.setNativeProps({style: styles.textHighlighted})
      }}
      onPressOut={() => {
        this.supportIcon.setNativeProps({style: styles.menuItemIcon})
        this.supportText.setNativeProps({style: styles.menuItemText})
      }}
        onPress={() => this._onPressFeedback()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            ref={(ref) => this.feedbackIcon = ref}
            name='speech'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.feedbackText = ref} style={styles.menuItemText}>
            Feedback
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderAboutButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.supportIcon.setNativeProps({style: styles.textHighlighted})
          this.supportText.setNativeProps({style: styles.textHighlighted})
        }}
        onPressOut={() => {
          this.supportIcon.setNativeProps({style: styles.menuItemIcon})
          this.supportText.setNativeProps({style: styles.menuItemText})
        }}
        onPress={() => this._onPressAbout()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            ref={(ref) => this.aboutIcon = ref}
            name='question'
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => this.aboutText = ref} style={styles.menuItemText}>
            About
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderHeader()}
        {this._renderSupportButton()}
        {this._renderFeedbackButton()}
        {this._renderAboutButton()}
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
