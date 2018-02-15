// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import AvatarContainer       from '../avatar/avatar_container.js';
import { styles }            from './friend_list_item_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';
import { renderMessageDate } from '../../utilities/date_time_utility.js';

//--------------------------------------------------------------------//

class FriendListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected:  false,
    }

    this.isFriendDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderDate() {
    let createdAtDate = null;
    let user = this.props.usersCache[this.props.userId];

    if (user && user.peek_message) {
      createdAtDate = user.peek_message.created_at;
    }

    return (
      <RN.Text style={styles.dateText}>
        {createdAtDate ? renderMessageDate(createdAtDate) : ''}
      </RN.Text>
    )
  }

  _renderUsernameView() {
    let user = this.props.usersCache[this.props.userId];
    let username = user ? user.username : null;
    let message = null;
    let messages = this.props.messages[this.props.userId];
    let messagePreview = '';

    if (messages && messages.length > 0) {
      message = messages[0];
    } else if (user.peek_message) {
      message = user.peek_message
    }

    if (message) {
      if (message.post_id) {
        if (this.props.postsCache[message.post_id] && this.props.postsCache[message.post_id].body) {
          messagePreview = this.props.postsCache[message.post_id].body;
        } else {
          if (message.author_id === this.props.client.id) {
            messagePreview = 'You shared a post.';
          } else {
            messagePreview = user.username + ' shared a post.';
          }
        }
      } else {
        if (message.body) {
          messagePreview = message.body;
        } else {
          if (message.author_id === this.props.client.id) {
            messagePreview = 'You shared an image.';
          } else {
            messagePreview = user.username + ' shared an image.';
          }
        }
      }
    }

    return (
      <RN.View style={styles.usernameView}>
        <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText16}>
          {username}
        </RN.Text>
        {messagePreview.length > 0 ?
          <RN.Text style={styles.messageText} numberOfLines={1}>
            {messagePreview}
          </RN.Text> :
          null }
      </RN.View>
    )
  }

  render() {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateToMessages({ userId: this.props.userId })}>
        <RN.View style={styles.rowView}>
          <RN.View style={styles.userView}>
            <RN.TouchableWithoutFeedback
              onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
              onPressOut={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.regularBlackText16})}
              onPress={() => this.props.navigateToProfile({ userId: this.props.userId })}
              >
              <RN.View>
                <AvatarContainer userId={this.props.userId} avatarSize={46} iconSize={17} frameBorderWidth={1.1} />
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

export default FriendListItem;
