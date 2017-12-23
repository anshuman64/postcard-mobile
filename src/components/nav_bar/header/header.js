// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }            from './header_styles.js';
import { COLORS }            from '../../../utilities/style_utility.js';
import { defaultErrorAlert } from '../../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class Header extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _onPressShare = () => {
    this.props.createPost(this.props.authToken, { body: this.props.postText })
      .then(() => {
        this.props.goBack();
      })
      .catch((error) => defaultErrorAlert(error))
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
          onPress={() => this.props.goBack()}
          >
          <Ionicon
            ref={(ref) => this.backIcon = ref}
            name='ios-arrow-round-back'
            style={styles.backIcon}
            />
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
          <Icon ref={(ref) => this.settingsIcon = ref} name='settings' style={styles.settingsIcon} />
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
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('NewPostScreen')} >
          <Icon name='note' style={styles.noteIcon} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderShareButton() {
    if (this.props.shareButton) {
      return (
        <RN.TouchableOpacity
          onPress={this._onPressShare}
          >
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
