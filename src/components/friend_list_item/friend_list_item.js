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
    let message = '';

    if (user.peek_message) {
      if (user.peek_message.post) {
        if (user.peek_message.post.body) {
          message = user.peek_message.post.body;
        } else {
          if (user.id === client.id) {
            message = 'You sent a post.';
          } else {
            message = user.username + ' share a post with you.';
          }
        }
      } else {
        if (user.peek_message.body) {
          message = user.peek_message.body;
        } else {
          if (user.id === client.id) {
            message = 'You sent an image.';
          } else {
            message = user.username + ' shared an image with you.';
          }
        }
      }
    }

    return (
      <RN.View style={styles.usernameView}>
        <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText16}>
          {username}
        </RN.Text>
        <RN.Text style={styles.messageText} numberOfLines={1}>
          {message}
        </RN.Text>
      </RN.View>
    )
  }

  // TODO: fix navigate to profile
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
              <AvatarContainer userId={this.props.userId} avatarSize={46} iconSize={17} frameBorderWidth={1.1} />
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
