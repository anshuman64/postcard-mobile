// Library Imports
import React from 'react';
import RN    from 'react-native';
import _     from 'lodash';

// Local Imports
import AvatarContainer                from '../avatar/avatar_container';
import { styles }                     from './entity_info_view_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import * as EntityUtility             from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  entityId (int): group or user to render
Optional Passed Props:
  disableAvatar (bool): if should disable click on Avatar to go to profile
  disableUsername (bool): if should disable click on username to go to profile
  marginLeft (int): amount of left margin
  mawWidth (int): maxWidth of username
*/
class EntityInfoView extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAvatar = () => {
    if (_.isString(this.props.entityId) || this.props.entityId < 0) {
      return;
    }

    this.props.navigateToProfile({ userId: this.props.entityId });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
    let authorId = EntityUtility.getConvoAuthorId(this.props.entityId, this.props.usersCache, this.props.groupsCache);
    let isNotUser = _.isString(this.props.entityId) || this.props.entityId < 0;
    let avatarSize = this.props.messagePreview ? 46 : 40;

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
        onPress={isNotUser ? null : this._onPressAvatar}
        disabled={isNotUser ? true : this.props.disableAvatar}
        >
        <RN.View>
          <AvatarContainer userId={authorId} avatarSize={avatarSize} iconSize={17} frameBorderWidth={1.1} />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderUsername() {
    let displayName = EntityUtility.getEntityDisplayName(this.props.entityId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
    let preview = this.props.messagePreview ? this.props.messagePreview : EntityUtility.getContactPreview(this.props.entityId, this.props.usersCache, this.props.contactsCache);
    let isNotUser = _.isString(this.props.entityId) || this.props.entityId < 0;

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
        onPress={isNotUser ? null : this._onPressAvatar}
        disabled={isNotUser ? true : this.props.disableUsername}
        >
        <RN.View style={styles.usernameView}>
          <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: scaleImage(this.props.maxWidth)}]} numberOfLines={1}>
            {displayName}
          </RN.Text>
          {preview ?
            <RN.Text style={[styles.messageText, {maxWidth: scaleImage(this.props.maxWidth)}]} numberOfLines={1}>
              {preview}
            </RN.Text> :
            null}
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={[styles.userView, {marginLeft: this.props.marginLeft}]}>
        {this._renderAvatar()}
        {this._renderUseranme()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default EntityInfoView;
