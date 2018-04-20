// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer      from '../avatar/avatar_container';
import { styles }           from './user_info_view_styles';
import { UTILITY_STYLES }   from '../../utilities/style_utility';
import { getTempGroupName } from '../../utilities/function_utility';

//--------------------------------------------------------------------//

class UserInfoView extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAvatar = () => {
    if (this.props.convoId < 0) {
      return;
    }

    this.props.navigateToProfile({ userId: this.props.convoId });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let convo;
    let displayName;
    let authorId;

    if (this.props.convoId > 0) {
      convo = this.props.usersCache[this.props.convoId];
      displayName = convo && convo.username ? convo.username : 'anonymous';
      authorId = this.props.convoId;
    } else {
      convo = this.props.groupsCache[this.props.convoId];
      displayName = convo && convo.name ? convo.name : getTempGroupName(convo.users, this.props.usersCache);
      authorId = convo && convo.peek_message ? convo.peek_message.author_id : null;
    }

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.usernameText.setNativeProps({style: styles.usernameText})}
        onPress={this._onPressAvatar}
        disabled={this.props.disabled}
        >
      <RN.View style={[styles.userView, {marginLeft: this.props.marginLeft}]}>
        <AvatarContainer userId={authorId} avatarSize={40} iconSize={17} frameBorderWidth={1.1} />
        <RN.Text ref={(ref) => this.usernameText = ref} style={styles.usernameText} numberOfLines={1}>
          {displayName}
        </RN.Text>
      </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//

export default UserInfoView;
