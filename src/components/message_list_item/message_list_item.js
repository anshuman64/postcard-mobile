// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }            from './message_list_item_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';
import { renderMessageDate } from '../../utilities/date_time_utility.js';

//--------------------------------------------------------------------//

class MessageListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // If the last message was sent more than 20 mins ago, render date header
  _renderDateHeader() {
    let isHeader = false;
    let thisMessageCreatedAt = new Date(this.props.message.created_at);

    if (this.props.index === this.props.messages[this.props.userId].data.length - 1) {
      isHeader = true;
    } else {
      let lastMessage = this.props.messages[this.props.userId].data[this.props.index - 1];
      let lastMessageCreatedAt = null;

      if (lastMessage) {
        lastMessageCreatedAt = new Date(lastMessage.created_at);

        if (lastMessageCreatedAt - thisMessageCreatedAt > 600000) {
          isHeader = true;
        }
      }
    }

    if (isHeader) {
      return (
        <RN.View style={styles.dateHeader}>
          <RN.Text style={styles.dateHeaderText}>
            {renderMessageDate(thisMessageCreatedAt)}
          </RN.Text>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderMessage() {
    let isAuthoredByClient = this.props.message.author_id === this.props.client.id;
    let avatarPath = this.props.usersCache[this.props.message.author_id] ? this.props.usersCache[this.props.message.author_id].avatar_url : null;
    let avatarUrl = this.props.imagesCache[avatarPath] ? this.props.imagesCache[avatarPath].url : null;

    if (isAuthoredByClient) {
      return (
        <RN.TouchableOpacity>
          <RN.View style={styles.messageViewClient}>
            <RN.Text style={styles.bodyTextClient}>
              {this.props.message.body}
            </RN.Text>
          </RN.View>
        </RN.TouchableOpacity>
      )
    } else {
      return (
        <RN.View style={styles.messageView}>
          <RN.Image
            source={{uri: avatarUrl}}
            style={styles.avatarImage}
            resizeMode={'cover'}
            onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarPath)}
            />
          <RN.TouchableOpacity>
            <RN.View style={styles.messageViewUser}>
              <RN.Text style={styles.bodyTextUser}>
                {this.props.message.body}
              </RN.Text>
            </RN.View>
          </RN.TouchableOpacity>
        </RN.View>
      )
    }
  }


  render() {


    return (
      <RN.View>
        {this._renderDateHeader()}
        {this._renderMessage()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default MessageListItem;
