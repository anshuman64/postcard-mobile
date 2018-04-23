// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer      from '../avatar/avatar_container';
import { styles }           from './user_info_view_styles';
import { UTILITY_STYLES }   from '../../utilities/style_utility';
import { getConvo, getConvoDisplayName, getConvoAuthorId } from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  convoId (int): group or user to render
Optional Passed Props:
  disabled (bool): if should disable click on profile to go to it
  marginLeft (int): amount of left margin
*/
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
    let convo = getConvo(this.props.convoId, this.props.usersCache, this.props.groupsCache);
    let displayName = getConvoDisplayName(this.props.convoId, this.props.usersCache, this.props.groupsCache);
    let authorId = getConvoAuthorId(this.props.convoId, this.props.usersCache, this.props.groupsCache);

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: styles.usernameText})}
        onPress={this.props.convoId < 0 ? null : this._onPressAvatar}
        disabled={this.props.convoId < 0 ? true : this.props.disabled}
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
