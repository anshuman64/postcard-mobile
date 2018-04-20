// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer       from '../avatar/avatar_container';
import { styles }            from './conversation_list_item_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import { renderMessageDate } from '../../utilities/date_time_utility';

//--------------------------------------------------------------------//

class ConversationListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderDate() {
    let createdAtDate = null;
    let convo;

    if (this.props.convoId > 0) {
      convo = this.props.usersCache[this.props.convoId];
    } else {
      convo = this.props.groupsCache[this.props.convoId];
    }

    if (convo) {
      createdAtDate = convo.peek_message ? convo.peek_message.created_at : convo.created_at;
    }

    return (
      <RN.Text style={styles.dateText}>
        {createdAtDate ? renderMessageDate(createdAtDate) : ''}
      </RN.Text>
    )
  }

  _renderUsernameView() {
    let convo;
    let displayName;

    if (this.props.convoId > 0) {
      convo = this.props.usersCache[this.props.convoId];
      displayName = convo && convo.username ? convo.username : 'anonymous';
    } else {
      convo = this.props.groupsCache[this.props.convoId];
      displayName = convo && convo.name ? convo.name : 'unknown';
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
        <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText16}>
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
    } else {
      peek_message = this.props.groupsCache[this.props.convoId].peek_message;
      authorId = peek_message ? peek_message.author_id : null;
    }

    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo('MessagesScreen', { convoId: this.props.convoId })}>
        <RN.View style={styles.rowView}>
          <RN.View style={styles.userView}>
            <RN.TouchableWithoutFeedback
              onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
              onPressOut={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
              onPress={() => this.props.navigateToProfile({ userId: this.props.userId })}
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
