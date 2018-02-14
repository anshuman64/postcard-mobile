// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListItem          from '../post_list_item/post_list_item_container.js';
import AvatarContainer       from '../avatar/avatar_container.js';
import { styles }            from './message_list_item_styles.js';
import * as StyleUtility     from '../../utilities/style_utility.js';
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
      let lastMessage = this.props.messages[this.props.userId].data[this.props.index + 1];
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

  _renderAvatar() {
    let isAvatar = false;

    if (this.props.index === 0) {
      isAvatar = true;
    } else {
      let thisMessageAuthor = this.props.message.author_id;
      let nextMessageAuthor = this.props.messages[this.props.userId].data[this.props.index - 1].author_id;

      if (thisMessageAuthor != nextMessageAuthor) {
        isAvatar = true;
      }
    }

    if (isAvatar) {
      return (
        <AvatarContainer userId={this.props.message.author_id} avatarSize={25} iconSize={10} frameBorderWidth={1} />
      )
    } else {
      return (
        <RN.View style={{width: 25, height: 25}} />
      )
    }
  }

  _renderBody(isAuthoredByClient) {
    if (this.props.message.body) {
      return (
        <RN.Text style={isAuthoredByClient ? styles.bodyTextClient : styles.bodyTextUser}>
          {this.props.message.body}
        </RN.Text>
      )
    } else {
      return null;
    }
  }

  _renderImage() {
    let imagePath = this.props.message.image_url;

    if (imagePath && this.props.imagesCache[imagePath]) {
      return (
        <RN.Image
          source={{uri: this.props.imagesCache[imagePath].url}}
          style={styles.image}
          resizeMode={'contain'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, imagePath)}
          />
      )
    } else if (imagePath && !this.props.imagesCache[imagePath]) {
      return (
        <RN.View style={styles.image}>
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderPost() {
    debugger
    let postId = this.props.message.post_id;

    if (postId && this.props.postsCache[postId]) {
      return (
        <PostListItem item={this.props.postsCache[postId]} width={StyleUtility.getUsableDimensions().width * 0.75} />
      )
    } else if (postId && !this.props.postsCache[postId]) {
      return (
        <RN.View style={styles.image}>
          <RN.ActivityIndicator size='small' color={StyleUtility.COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderMessage() {
    let isAuthoredByClient = this.props.message.author_id === this.props.client.id;

    if (isAuthoredByClient) {
      return (
        <RN.View style={styles.messageContainerClient}>
          <RN.TouchableOpacity>
            <RN.View style={styles.messageViewClient}>
              {this._renderPost()}
              {this._renderBody(isAuthoredByClient)}
              {this._renderImage()}
            </RN.View>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.messageContainerUser}>
        {this._renderAvatar()}
        <RN.TouchableOpacity>
            <RN.View style={styles.messageViewUser}>
              {this._renderPost()}
              {this._renderBody(isAuthoredByClient)}
              {this._renderImage()}
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
