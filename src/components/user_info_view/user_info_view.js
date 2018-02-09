// Library Imports
import React           from 'react';
import RN              from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }           from './user_info_view_styles.js';
import { UTILITY_STYLES }   from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class UserInfoView extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
    let avatarPath = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].avatar_url : null;
    let avatarUrl = this.props.imagesCache[avatarPath] ? this.props.imagesCache[avatarPath].url : null;

    if (avatarPath && avatarUrl) {
      return (
        <CachedImage
          source={{uri: avatarUrl}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarPath)}
          />
      )
    } else if (avatarPath && !avatarUrl) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <RN.View style={styles.frameBorder}>
          <Icon name='user' style={styles.userIcon} />
        </RN.View>
      )
    }
  }

  render() {
    let username = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].username : null;

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.usernameText.setNativeProps({style: styles.usernameText})}
        onPress={() => this.props.navigateToProfile({ userId: this.props.userId })}
        disabled={this.props.disabled}
        >
      <RN.View style={[styles.userView, {marginLeft: this.props.marginLeft}]}>
        <RN.View style={styles.frame}>
          {this._renderAvatar()}
        </RN.View>
        <RN.Text ref={(ref) => this.usernameText = ref} style={styles.usernameText} numberOfLines={1}>
          {username}
        </RN.Text>
      </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//

export default UserInfoView;
