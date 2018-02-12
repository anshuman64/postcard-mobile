// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
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

  _renderAvatar() {
    let avatarPath = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].avatar_url : null;
    let avatarUrl = this.props.imagesCache[avatarPath] ? this.props.imagesCache[avatarPath].url : null;

    if (avatarPath && avatarUrl) {
      return (
        <RN.Image
          source={{uri: avatarUrl}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarPath)}
          />
      )
    } else if (avatarPath && !avatarUrl) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <RN.View style={styles.frameBorder}>
          <Icon name='user' style={styles.userIcon} />
        </RN.View>
      )
    }
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
        <RN.Text style={UTILITY_STYLES.lightBlackText15}>
          {username}
        </RN.Text>
        <RN.Text style={styles.messageText}>
          {message}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.TouchableHighlight onPress={() => this.props.navigateToMessages(this.props.userId)}>
        <RN.View style={styles.rowView}>
          <RN.View style={styles.userView}>
            <RN.View style={styles.frame}>
              {this._renderAvatar()}
            </RN.View>
            {this._renderUsernameView()}
          </RN.View>
          {this._renderDate()}
        </RN.View>
      </RN.TouchableHighlight>
    )
  }
}


//--------------------------------------------------------------------//

export default FriendListItem;
