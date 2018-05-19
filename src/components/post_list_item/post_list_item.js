// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Swiper          from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import Hyperlink       from 'react-native-hyperlink';
import LinkPreview     from 'react-native-link-preview';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon         from 'react-native-vector-icons/Ionicons';
import EvilIcons       from 'react-native-vector-icons/EvilIcons';

// Local Imports
import PostLinkPreview          from '../post_link_preview/post_link_preview';
import MediumContainer          from '../medium/medium_container';
import LoadingModal             from '../loading_modal/loading_modal';
import ListModalContainer       from '../list_modal/list_modal_container';
import EntityInfoViewContainer  from '../entity_info_view/entity_info_view_container';
import { FRIEND_TYPES }         from '../../actions/friendship_actions';
import { POST_TYPES }           from '../../actions/post_actions';
import { styles, scaleHeart }   from './post_list_item_styles';
import { renderPostDate }       from '../../utilities/date_time_utility';
import { defaultErrorAlert }    from '../../utilities/error_utility';
import * as FunctionUtility     from '../../utilities/function_utility';
import { getEntityDisplayName } from '../../utilities/entity_utility';
import * as StyleUtility        from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const AnimatedIonicon = Animatable.createAnimatableComponent(Ionicon);

/*
Required Passed Props:
  item (object): post object to render
Optional Passed Props:
  width (int): width of messages; only passed if on MessagesScreen
  postType (string): used as a proxy for which screen we are on
*/
class PostListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLikingAnimation: false, // if the liking animation is still playing
      isLikingServer:    false, // if the server is still registering the create/delete like
      isModalVisible:    false,
      isModalForReply:   false,
      isLoading:         false,
      swiperHeight:      null,
      linkPreviewData:   null,
    }

    this.isLikeDisabled    = false;
    this.isFlagDisabled    = false;
    this.isDeleteDisabled  = false;
    this.isReplyDisabled   = false;
    this.recipients        = null;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.item.body) {
      LinkPreview.getPreview(this.props.item.body)
        .then((data) => {
          this.setState({ linkPreviewData: data });
        })
        .catch((error) => {
          // console.log(error);
        });
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Callback function used for Cancel button in ListModal
  setParentState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Like Post Callback Methods
  //--------------------------------------------------------------------//

  // Creates/deletes like and handles animation
  _onPressLike = () => {
    if (this.isLikeDisabled || this.state.isLikingAnimation || this.state.isLikingServer) {
      return;
    }

    this.isLikeDisabled = true;

    this.setState({ isLikingServer: true }, () => {
      // If post already liked, delete like
      if (this.props.item.is_liked_by_client) {
        this.props.deleteLike(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.item.id)
          .catch((error) => {
            defaultErrorAlert(error);
          })
          .finally(() => {
            this.isLikeDisabled = false;
            this.setState({ isLikingServer: false });
          });
      } else {
        this.props.createLike(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, this.props.item.id)
          .catch((error) => {
            defaultErrorAlert(error);
          })
          .finally(() => {
            this.isLikeDisabled = false;
            this.setState({ isLikingServer: false });
          });
      }
    })
  }

  //--------------------------------------------------------------------//
  // Flag Post Callback Methods
  //--------------------------------------------------------------------//

  // Creates/deletes flag on post
  _onPressFlag = () => {
    if (this.isFlagDisabled) {
      return;
    }

    this.isFlagDisabled = true;

    // If post is flagged, delete flag
    if (this.props.item.is_flagged_by_client) {
      this.props.deleteFlag(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.item.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFlagDisabled = false;
        });
    // If post is not flagged, pop alert asking user to confirm
    } else {
      RN.Alert.alert('', 'Are you sure you want to flag this post as inappropriate and remove it?',
        [{text: 'Cancel', onPress: () => this.isFlagDisabled = false, style: 'cancel'},
         {text: 'Flag', onPress: this._onConfirmFlag}],
         {onDismiss: () => this.isFlagDisabled = false}
      )
    }
  }

  // Creates flag
  _onConfirmFlag = () => {
    this.props.createFlag(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.item.id)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFlagDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Delete Post Callback Methods
  //--------------------------------------------------------------------//

  // Alert that pops up when a user is about to delete a post
  _onPressDelete = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    RN.Alert.alert('', 'Are you sure you want to delete this post?',
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: 'Delete', onPress: this._onConfirmDelete}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  // Deletes post from DB and fades post out before removing from store
  _onConfirmDelete = () => {
    // Delete post from DB
    this.props.deletePost(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.item.id)
      .then((deletedPost) => {
        // Fade out post
        this.container.fadeOut(500)
          .finally(() => {
            // Remove post from store
            this.props.removePost({ post: deletedPost, clientId: this.props.client.id  });
            this.isDeleteDisabled = false;
          });
      })
      .catch((error) => {
        this.isDeleteDisabled = false;
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Reply Post Callback Methods
  //--------------------------------------------------------------------//

  _onPressReply = () => {
    if (this.isReplyDisabled) {
      return;
    }

    let convoId;
    let recipients;
    this.isReplyDisabled = true;

    // For AuthoredScreen, go to recipient which is either a user or group
    if (this.props.postType === POST_TYPES.AUTHORED && this.props.client.id === this.props.item.author_id) {
      recipients = this.props.item.recipient_ids;
      if (recipients.length === 1) {
        convoId = this.props.item.recipient_ids[0];
        convoId = convoId < 0 || (this.props.usersCache[convoId] && this.props.usersCache[convoId].firebase_uid) ? convoId : null; // handle the case if only a contact received the post
      } else {
        this.isReplyDisabled = false;
        this.setState({ isModalVisible: true, isModalForReply: true });
        return;
      }
    } else {
      recipients = this.props.item.recipient_ids_with_client;
      if (recipients.length === 0) {
        convoId = this.props.item.author_id;
      } else if (recipients.length === 1) {
        convoId = this.props.item.recipient_ids_with_client[0] > 0 ? this.props.item.author_id : this.props.item.recipient_ids_with_client[0];
      } else {
        this.isReplyDisabled = false;
        this.setState({ isModalVisible: true, isModalForReply: true });
        return;
      }
    }

    if (convoId) {
      RN.Alert.alert('', 'Reply to this post as a message?',
        [{text: 'Cancel', onPress: () => this.isReplyDisabled = false, style: 'cancel'},
         {text: 'Reply', onPress: () => this._onConfirmReply(convoId)}],
         {onDismiss: () => this.isReplyDisabled = false}
      )
    }
  }

  _onConfirmReply(convoId) {
    this.setState({ isLoading: true },() => {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, convoId, null, null, this.props.item.id)
        .then(() => {
          this.props.navigateTo('MessagesScreen', { convoId: convoId });
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    });
  }

  //--------------------------------------------------------------------//
  // Forward Post Callback Methods
  //--------------------------------------------------------------------//

  _onPressForward = () => {
    this.props.navigateTo('ShareScreen', { postId: this.props.item.id });
  }

  //--------------------------------------------------------------------//
  // Post Header Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <RN.View style={styles.headerView}>
        {this._renderUserView()}
        {this._renderIconView()}
      </RN.View>
    )
  }

  _renderUserView() {
    let isRecipients = !this.props.width && ((this.props.postType === POST_TYPES.AUTHORED && this.props.client.id === this.props.item.author_id && this.props.item.recipient_ids_with_client.length > 0)
    || (this.props.item.recipient_ids.length > 0));

    return (
      <RN.View style={styles.userView}>
        <EntityInfoViewContainer
          disableAvatar={this.props.client.id === this.props.item.author_id}
          disableUsername={this.props.client.id === this.props.item.author_id}
          entityId={this.props.item.author_id}
          marginLeft={0}
          subtractWidth={isRecipients ? 300 : 200}
          messagePreview={' '}
          />
        {this._renderRecipients()}
      </RN.View>
    )
  }

  _renderRecipients() {
    if (this.props.width) {
      return null;
    } else {
      let numRecipients;
      let displayString = '';
      let callback;

      // If post is authored by client and on AuthoredPosts tab, render recipients of the post
      if (this.props.postType === POST_TYPES.AUTHORED && this.props.client.id === this.props.item.author_id) {
        numRecipients = this.props.item.recipient_ids.length;

        if (numRecipients === 0) {
          return null;
        } else if (numRecipients === 1) {
          entityId = this.props.item.recipient_ids[0];
          displayString = getEntityDisplayName(entityId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
          callback = entityId > 0 && this.props.usersCache[entityId] && this.props.usersCache[entityId].firebase_uid ? () => this.props.navigateToProfile({ userId: this.props.item.recipient_ids[0] }) : null; // need to be explicit in userId because callback is in its own scope
        } else {
          displayString = numRecipients + ' recipients';
          callback = FunctionUtility.setStateCallback(this, { isModalVisible: true, isModalForReply: false });
        }
      // Otherwise, render groups that client is a part of that received the post
      } else {
        numRecipients = this.props.item.recipient_ids_with_client.length;

        if (numRecipients === 0) {
          return null;
        } else if (numRecipients === 1) {
          convoId = this.props.item.recipient_ids_with_client[0];
          displayString = getEntityDisplayName(convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
        } else {
          displayString = numRecipients + ' groups';
          callback = FunctionUtility.setStateCallback(this, { isModalVisible: true, isModalForReply: false });
        }
      }

      return (
        <RN.View style={styles.usernameView}>
          <Ionicon name={'md-play'} style={[styles.playIcon, {marginLeft: 5}]}/>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.displayString.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
            onPressOut={() => this.displayString.setNativeProps({style: [StyleUtility.UTILITY_STYLES.lightBlackText15, {marginLeft: 5}]})}
            style={styles.usernameView}
            onPress={callback}
            disabled={!callback}
            >
            <RN.View>
              <RN.Text
                allowFontScaling={false}
                ref={(ref) => this.displayString = ref}
                numberOfLines={1}
                style={[StyleUtility.UTILITY_STYLES.lightBlackText15, {marginLeft: 5}, { maxWidth: 100 }]}
                >
                {displayString}
              </RN.Text>
            </RN.View>
          </RN.TouchableWithoutFeedback>
        </RN.View>
      )
    }
  }

  _renderIconView() {
    if (this.props.width) {
      return null;
    } else {
      return (
        <RN.View style={styles.iconView}>
          {this._renderIcon(this.replyIcon, 'action-undo', this._onPressReply, styles.replyIcon, StyleUtility.UTILITY_STYLES.textHighlighted, false)}
          {this._renderIcon(this.forwardIcon, 'action-redo', this._onPressForward, styles.forwardIcon, StyleUtility.UTILITY_STYLES.textHighlighted, false)}
          {this.props.client.id === this.props.item.author_id ?
            this._renderIcon(this.closeIcon, 'close', this._onPressDelete, styles.closeIcon, StyleUtility.UTILITY_STYLES.textHighlighted, true) :
            this._renderIcon(this.flagIcon, 'flag', this._onPressFlag, styles.flagIcon, StyleUtility.UTILITY_STYLES.textRed, false)}
        </RN.View>
      )
    }
  }

  _renderIcon(iconRef, iconName, callback, style, highlightStyle, isEvilIcon) {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => iconRef.setNativeProps({style: highlightStyle})}
        onPressOut={() => iconRef.setNativeProps({style: style})}
        onPress={callback}
        >
        <RN.View style={styles.iconButton}>
          {isEvilIcon ?
          <EvilIcons ref={(ref) => iconRef = ref} name={iconName} style={style} /> :
          <Icon ref={(ref) => iconRef = ref} name={iconName} style={style} />}
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }


  //--------------------------------------------------------------------//
  // Post Body Render Methods
  //--------------------------------------------------------------------//

  _renderBody() {
    let body = this.props.item.body;

    if (body) {
      return (
        <RN.View style={styles.bodyView}>
          <RN.View style={styles.bodyTextView}>
            <Hyperlink linkDefault={true} linkStyle={StyleUtility.UTILITY_STYLES.textHighlighted}>
              <RN.Text allowFontScaling={false} style={[styles.bodyText, body.length > 85 && styles.smallBodyText]}>
                {body}
              </RN.Text>
            </Hyperlink>
          </RN.View>
        </RN.View>
      )
    }
  }

  _renderMedia() {
    let media = this.props.item.media;
    let width = this.props.width || StyleUtility.getUsableDimensions().width;
    let height;

    if (!media || media.length === 0) {
      // Only render link previews if there is no other media attached
      if (this.state.linkPreviewData) {
        return (
          <PostLinkPreview data={this.state.linkPreviewData} width={width} />
        )
      } else {
        return null;
      }
    } else if (media.length === 1) {
      height = StyleUtility.getScaledHeight(media[0], width);

      return (
        <MediumContainer
          medium={media[0]}
          mediumStyle={{ width: width, height: height }}
          />
      )
    } else {
      height = this.state.swiperHeight || StyleUtility.getScaledHeight(media[0], width);
      height += 65

      return (
        <Swiper
          loop={false}
          automaticallyAdjustContentInsets={true}
          onIndexChanged={(index) => this.setState({ swiperHeight: StyleUtility.getScaledHeight(media[index], width) })}
          height={height}
          width={width}
          dot={<RN.View style={styles.dot} />}
          activeDot={<RN.View style={styles.activeDot} />}
          >
          {this._renderMediaList()}
        </Swiper>
      )
    }
  }

  _renderMediaList() {
    let rows = [];
    let media = this.props.item.media;
    let width = this.props.width || StyleUtility.getUsableDimensions().width;
    let height;

    for (i = 0; i < media.length; i++) {
      height = StyleUtility.getScaledHeight(media[i], width);

      rows.push(
        <MediumContainer
          key={i}
          medium={media[i]}
          mediumStyle={{ width: width, height: height }}
          imageUrls={FunctionUtility.getImageUrlsFromMedia(this.props.item.media, this.props.mediaCache)}
          />
      )
    }

    return rows;
  }

  //--------------------------------------------------------------------//
  // Post Footer Render Methods
  //--------------------------------------------------------------------//

  _renderFooter() {
    return (
      <RN.View style={styles.footerView}>
        <RN.TouchableWithoutFeedback onPressIn={this._onPressLike}>
          <RN.View style={styles.likesView}>
            {this._renderLike()}
            {this.props.client.id === this.props.item.author_id ?
              <RN.Text allowFontScaling={false} style={styles.likeCountText}>
              {FunctionUtility.getReadableCount(this.props.item.num_likes)}
            </RN.Text> :
            null}
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.Text allowFontScaling={false} style={styles.dateText}>
          {renderPostDate(this.props.item.created_at)}
        </RN.Text>
      </RN.View>
    )
  }

  _renderLike() {
    if ((!this.props.item.is_liked_by_client && !(!this.state.isLikingServer && !this.state.isLikingAnimation))
        || this.props.item.is_liked_by_client) {
      return (
        <AnimatedIonicon
          name='md-heart'
          animation={scaleHeart}
          duration={750}
          style={styles.heartIcon}
          onAnimationBegin={FunctionUtility.setStateCallback(this, { isLikingAnimation: true })}
          onAnimationEnd={FunctionUtility.setStateCallback(this, { isLikingAnimation: false })}
          />
      )
    } else {
      return (
        <Ionicon name='md-heart-outline' style={styles.heartIcon} />
      )
    }
  }

  //--------------------------------------------------------------------//
  // Other Render Methods
  //--------------------------------------------------------------------//

  _renderListModal() {
    let recipientIds = this.props.postType === POST_TYPES.RECEIVED ? this.props.item.recipient_ids_with_client : this.props.item.recipient_ids;

    return (
      <ListModalContainer
        isModalVisible={this.state.isModalVisible}
        recipientIds={recipientIds}
        postId={this.props.item.id}
        authorId={this.props.item.author_id}
        setParentState={this.setParentState}
        isModalForReply={this.state.isModalForReply}
        />
    )
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  render() {
    return(
      <RN.View style={styles.container}>
        <RN.TouchableWithoutFeedback onLongPress={this._onPressLike}>
          <Animatable.View ref={(ref) => this.container = ref} style={[styles.postContainer, this.props.width && styles.postAsMessageContainer, this.props.width && { width: this.props.width }]}>
            {this._renderHeader()}
            {this._renderBody()}
            {this._renderMedia()}
            {this._renderFooter()}
          </Animatable.View>
        </RN.TouchableWithoutFeedback>
          {this._renderListModal()}
          {this._renderLoadingModal()}
      </RN.View>
    )
  }
}



//--------------------------------------------------------------------//

export default PostListItem;
