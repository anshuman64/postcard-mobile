// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer       from '../avatar/avatar_container';
import { styles }            from './conversation_list_item_styles';
import { UTILITY_STYLES, scaleImage }    from '../../utilities/style_utility';
import { renderConversationDate } from '../../utilities/date_time_utility';
import { getTempGroupName }  from '../../utilities/function_utility';

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
    let createdAtDate = null;
    let convo;

    if (this.props.convoId > 0) {
      convo = this.props.usersCache[this.props.convoId];
    } else if (this.props.convoId < 0) {
      convo = this.props.groupsCache[this.props.convoId];
    }

    if (convo) {
      createdAtDate = convo.peek_message ? convo.peek_message.created_at : convo.created_at;
    }

    return (
      <RN.Text style={styles.dateText}>
        {createdAtDate ? renderConversationDate(createdAtDate) : ''}
      </RN.Text>
    )
  }

  _renderUsernameView() {
    let convo;
    let displayName = 'unknown';

    if (this.props.convoId > 0) {
      convo = this.props.usersCache[this.props.convoId];
      displayName = convo && convo.username ? convo.username : 'anonymous';
    } else if (this.props.convoId < 0) {
      convo = this.props.groupsCache[this.props.convoId];
      displayName = convo && convo.name ? convo.name : getTempGroupName(convo.users, this.props.usersCache);
    }

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
      <RN.View style={styles.usernameView}>
        <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText16, {maxWidth: scaleImage(130)}]} numberOfLines={1}>
          {displayName}
        </RN.Text>
        <RN.Text style={styles.messageText} numberOfLines={1}>
          {messagePreview}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    let authorId;

    if (this.props.convoId > 0) {
      authorId = this.props.convoId;
    } else if (this.props.convoId < 0) {
      convo = this.props.groupsCache[this.props.convoId];
      authorId = convo && convo.peek_message ? convo.peek_message.author_id : null;
    }

    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo('MessagesScreen', { convoId: this.props.convoId })}>
        <RN.View style={UTILITY_STYLES.rowView}>
          <RN.View style={styles.userView}>
            <RN.TouchableWithoutFeedback
              onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
              onPressOut={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
              onPress={this._onPressAvatar}
              >
              <RN.View>
                <AvatarContainer userId={authorId} avatarSize={46} iconSize={17} frameBorderWidth={1.1} />
              </RN.View>
            </RN.TouchableWithoutFeedback>
            {this._renderUsernameView()}
          </RN.View>
          {this._renderDate()}
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//

export default ConversationListItem;
