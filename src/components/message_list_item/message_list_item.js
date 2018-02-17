// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Hyperlink       from 'react-native-hyperlink'
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListItem          from '../post_list_item/post_list_item_container';
import AvatarContainer       from '../avatar/avatar_container';
import { styles }            from './message_list_item_styles';
import * as StyleUtility     from '../../utilities/style_utility';
import { renderMessageDate } from '../../utilities/date_time_utility';
import { setStateCallback }  from '../../utilities/function_utility';

//--------------------------------------------------------------------//

class MessageListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isDateShown: false,
    };
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  // If the last message was sent more than 20 mins ago, render date header
  _renderDateHeader() {
    let isHeader = false;
    let thisMessageCreatedAt = new Date(this.props.message.created_at);

    // Show date if:
    // 1) the message is the first message in the conversation
    // 2) the last message was sent more than 10 mins ago
    if (this.props.index === this.props.messages[this.props.userId].data.length - 1) {
      isHeader = true;
    } else {
      let lastMessage = this.props.messages[this.props.userId].data[this.props.index + 1];

      if (lastMessage) {
        let lastMessageCreatedAt = new Date(lastMessage.created_at);

        if (thisMessageCreatedAt - lastMessageCreatedAt > 600000) {
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

    // Show avatar on other user's message if:
    // 1) the message is the newest message
    // 2) the next message is by the client
    // 3) the next message was sent more than 10 mins later
    if (this.props.index === 0) {
      isAvatar = true;
    } else {
      let thisMessage = this.props.message;
      let nextMessage = this.props.messages[this.props.userId].data[this.props.index - 1];
      let thisMessageCreatedAt = new Date(thisMessage.created_at);
      let nextMessageCreatedAt = new Date(nextMessage.created_at);

      if (thisMessage.author_id != nextMessage.author_id
          || nextMessageCreatedAt - thisMessageCreatedAt > 600000) {
        isAvatar = true;
      }
    }

    if (isAvatar) {
      return (
        <AvatarContainer userId={this.props.message.author_id} avatarSize={30} iconSize={12} frameBorderWidth={1.1} />
      )
    } else {
      return (
        <RN.View style={{width: 30, height: 30}} />
      )
    }
  }

  _renderBody(isAuthoredByClient) {
    if (this.props.message.body) {
      return (
        <Hyperlink linkDefault={true} linkStyle={{color: StyleUtility.COLORS.grey900}}>
          <RN.Text style={isAuthoredByClient ? styles.bodyTextClient : styles.bodyTextUser}>
            {this.props.message.body}
          </RN.Text>
        </Hyperlink>
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

  _renderDate(isAuthoredByClient) {
    if (this.state.isDateShown) {
      return (
        <RN.Text style={[styles.date, isAuthoredByClient && {alignSelf: 'flex-end'}]}>
          {renderMessageDate(this.props.message.created_at)}
        </RN.Text>
      )
    } else {
      return null;
    }
  }

  _renderPost() {
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
    let isBackgroundColor  = this.props.message.body;
    let isFirstMessage = this.props.index === 0;

    if (isAuthoredByClient) {
      return (
        <RN.View style={[styles.messageContainerClient, isFirstMessage && {marginBottom: 15}]}>
          <RN.TouchableOpacity activeOpacity={0.5} onPress={setStateCallback(this, { isDateShown: !this.state.isDateShown})}>
            <RN.View style={[styles.messageViewClient, !isBackgroundColor && {backgroundColor: 'transparent'}]}>
              {this._renderPost()}
              {this._renderBody(isAuthoredByClient)}
              {this._renderImage()}
            </RN.View>
            {this._renderDate(isAuthoredByClient)}
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={[styles.messageContainerUser, isFirstMessage && {marginBottom: 15}]}>
        {this._renderAvatar()}
        <RN.TouchableOpacity activeOpacity={0.5} onPress={setStateCallback(this, { isDateShown: !this.state.isDateShown})}>
            <RN.View style={[styles.messageViewUser, !isBackgroundColor && {backgroundColor: 'transparent'}]}>
              {this._renderPost()}
              {this._renderBody(isAuthoredByClient)}
              {this._renderImage()}
            </RN.View>
            {this._renderDate(isAuthoredByClient)}
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
