// Library Imports
import React     from 'react';
import RN        from 'react-native';
import _         from 'lodash';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }            from './header_styles.js';
import { COLORS }            from '../../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this._onPressShareThrottled = _.throttle(this._onPressShare, 1000, { trailing: false });
    this._goBackThrottled = _.throttle(this._goBack, 500, { trailing: false });
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _goBack = () => {
    this.props.goBack();
  }

  _onPressShare = () => {
    if (!this.props.postText) {
      return;
    }

    this.props.createPost(this.props.authToken, this.props.firebaseUserObj, { body: this.props.postText })
      .then(() => {
        RN.AsyncStorage.setItem('scrollToTop', 'true', () => {
          this._goBackThrottled();
        });
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderBackIcon() {
    if (this.props.backIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.backIcon.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.backIcon.setNativeProps({style: styles.backIcon})}
          onPress={() => this._goBackThrottled()}
          >
          <RN.View style={styles.button}>
            <Ionicon
              ref={(ref) => this.backIcon = ref}
              name='ios-arrow-round-back'
              style={styles.backIcon}
              />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderSettingsIcon() {
    if (this.props.settingsIcon) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: styles.textHighlighted})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={() => this.props.navigateTo('MenuScreen')}
          >
          <RN.View style={styles.button}>
            <Icon ref={(ref) => this.settingsIcon = ref} name='settings' style={styles.settingsIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderLogo() {
    if (this.props.logo) {
      return (
        <RN.Image
          style={styles.logo}
          source={require('../../../assets/images/icon/icon.png')}
          resizeMode='cover'
          />
      )
    }
  }

  _renderNoteIcon() {
    if (this.props.noteIcon) {
      return (
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('NewPostScreen')} style={styles.button} >
          <Icon name='note' style={styles.noteIcon} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderShareButton() {
    if (this.props.shareButton) {
      return (
        <RN.TouchableOpacity onPress={this._onPressShareThrottled} style={styles.button} >
          <RN.Text style={styles.shareButton}>Share</RN.Text>
        </RN.TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <RN.View style={[styles.header, this.props.currentScreen === '_HomeScreen' && styles.border]}>
        {this._renderBackIcon()}
        {this._renderSettingsIcon()}
        {this._renderLogo()}
        {this._renderNoteIcon()}
        {this._renderShareButton()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default Header;
