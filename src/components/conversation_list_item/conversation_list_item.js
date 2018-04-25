// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import UserInfoView                   from '../user_info_view/user_info_view_container';
import AvatarContainer                from '../avatar/avatar_container';
import { styles }                     from './conversation_list_item_styles';
import { UTILITY_STYLES, scaleImage } from '../../utilities/style_utility';
import { renderConversationDate }     from '../../utilities/date_time_utility';
import * as FunctionUtility           from '../../utilities/function_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  convoId (int): id of the user or group of the conversation
Optional Passed Props:
  -
*/
class ConversationListItem extends React.PureComponent {

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

  _renderDate() {
    let convo = FunctionUtility.getConvo(this.props.convoId, this.props.usersCache, this.props.groupsCache);
    let createdAtDate = convo && convo.peek_message ? convo.peek_message.created_at : convo.created_at;

    return (
      <RN.Text style={styles.dateText}>
        {createdAtDate ? renderConversationDate(createdAtDate) : ''}
      </RN.Text>
    )
  }

  _renderUsernameView() {
    let convo = FunctionUtility.getConvo(this.props.convoId, this.props.usersCache, this.props.groupsCache);
    let message = convo ? convo.peek_message : null;
    let messagePreview = 'Send a message...';

    if (message) {
      let lastAuthor = this.props.usersCache[message.author_id];
      let lastAuthorUsername = lastAuthor && lastAuthor.username ? lastAuthorUsername : 'anonymous';

      if (message.post_id) {
        let post = this.props.postsCache[message.post_id];

        if (post && post.body) {
          messagePreview = post.body;
        } else {
          if (message.author_id === this.props.client.id) {
            messagePreview = 'You shared a post.';
          } else {
            messagePreview = lastAuthorUsername + ' shared a post.';
          }
        }
      } else {
        if (message.body) {
          messagePreview = message.body;
        } else {
          if (message.author_id === this.props.client.id) {
            messagePreview = 'You shared an image.';
          } else {
            messagePreview = lastAuthorUsername + ' shared an image.';
          }
        }
      }
    }

    return (
      <UserInfoView convoId={this.props.convoId} messagePreview={messagePreview} disableUsername={true} marginLeft={7} />
    )
  }

  render() {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo('MessagesScreen', { convoId: this.props.convoId })}>
        <RN.View style={UTILITY_STYLES.rowView}>
          {this._renderUsernameView()}
          {this._renderDate()}
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//

export default ConversationListItem;
