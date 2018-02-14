// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer    from '../avatar/avatar_container.js';
import { styles }         from './user_info_view_styles.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class UserInfoView extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

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
        <AvatarContainer userId={this.props.userId} avatarSize={40} iconSize={17} frameBorderWidth={1.1} />
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
