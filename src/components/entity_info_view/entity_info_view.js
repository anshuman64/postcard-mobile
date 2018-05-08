// Library Imports
import React from 'react';
import RN    from 'react-native';
import _     from 'lodash';

// Local Imports
import AvatarContainer                from '../avatar/avatar_container';
import { styles }                     from './entity_info_view_styles';
import { UTILITY_STYLES, getUsableDimensions } from '../../utilities/style_utility';
import * as EntityUtility             from '../../utilities/entity_utility';
import { isStringEmpty }              from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  entityId (int): group or user to render
Optional Passed Props:
  disableAvatar (bool): if should disable click on Avatar to go to profile
  disableUsername (bool): if should disable click on username to go to profile
  marginLeft (int): amount of left margin
  subtractWidth (int): amount to subtract from getUsableDimensions().width for length of username
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
    let isNotUser = _.isString(this.props.entityId) || this.props.entityId < 0 || (this.props.usersCache[this.props.entityId] && !this.props.usersCache[this.props.entityId].firebase_uid);
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
    let preview = this.props.messagePreview ? this.props.messagePreview : EntityUtility.getEntityPreview(this.props.entityId, this.props.usersCache, this.props.contactsCache);
    let isNotUser = _.isString(this.props.entityId) || this.props.entityId < 0 || (this.props.usersCache[this.props.entityId] && !this.props.usersCache[this.props.entityId].firebase_uid);
    let maxWidth = getUsableDimensions().width - this.props.subtractWidth;

    return (
      <RN.TouchableWithoutFeedback
        onPressIn={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={isNotUser ? null : () => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
        onPress={isNotUser ? null : this._onPressAvatar}
        disabled={isNotUser ? true : this.props.disableUsername}
        >
        <RN.View style={styles.usernameView}>
          <RN.Text allowFontScaling={false} ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: maxWidth}]} numberOfLines={1}>
            {displayName}
          </RN.Text>
          {!isStringEmpty(preview) ?
            <RN.Text allowFontScaling={false} style={[styles.messageText, {maxWidth: maxWidth}]} numberOfLines={1}>
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
        {this._renderUsername()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default EntityInfoView;
