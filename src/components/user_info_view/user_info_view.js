// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import AvatarContainer                from '../avatar/avatar_container';
import { styles }                     from './user_info_view_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import * as FunctionUtility           from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  convoId (int): group or user to render
Optional Passed Props:
  disableAvatar (bool): if should disable click on Avatar to go to profile
  disableUsername (bool): if should disable click on username to go to profile
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
    let convo = FunctionUtility.getConvo(this.props.convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
    let displayName = FunctionUtility.getConvoDisplayName(this.props.convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
    let authorId = FunctionUtility.getConvoAuthorId(this.props.convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);

    return (
      <RN.View style={[styles.userView, {marginLeft: this.props.marginLeft}]}>
        <RN.TouchableWithoutFeedback
          onPressIn={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
          onPress={this.props.convoId < 0 ? null : this._onPressAvatar}
          disabled={this.props.convoId < 0 ? true : this.props.disableAvatar}
          >
          <RN.View>
            <AvatarContainer userId={authorId} avatarSize={this.props.messagePreview ? 46 : 40} iconSize={17} frameBorderWidth={1.1} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.TouchableWithoutFeedback
          onPressIn={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={this.props.convoId < 0 ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
          onPress={this.props.convoId < 0 ? null : this._onPressAvatar}
          disabled={this.props.convoId < 0 ? true : this.props.disableUsername}
          >
          <RN.View style={styles.usernameView}>
            <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: scaleImage(120)}]} numberOfLines={1}>
              {displayName}
            </RN.Text>
            {this.props.messagePreview ?
              <RN.Text style={styles.messageText} numberOfLines={1}>
                {this.props.messagePreview}
              </RN.Text> :
              null}
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserInfoView;
