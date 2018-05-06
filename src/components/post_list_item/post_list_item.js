// Library Imports
import React           from 'react';
import RN              from 'react-native';
import Swiper          from 'react-native-swiper';
import * as Animatable from 'react-native-animatable';
import Hyperlink       from 'react-native-hyperlink'
import Icon            from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon         from 'react-native-vector-icons/Ionicons';
import EvilIcons       from 'react-native-vector-icons/EvilIcons';

// Local Imports
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
  isClient (bool): if the screen is for the client
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
      isLoading:         false,
      swiperHeight:      null,
    }

    this.isLikeDisabled    = false;
    this.isFlagDisabled    = false;
    this.isDeleteDisabled  = false;
    this.isRespondDisabled = false;
    this.recipients        = null;
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
  _onPressFlagPost = () => {
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
         {text: 'Flag', onPress: this._onConfirmFlagPost}],
         {onDismiss: () => this.isFlagDisabled = false}
      )
    }
  }

  // Creates flag
  _onConfirmFlagPost = () => {
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
  _onPressDeletePost = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    RN.Alert.alert('', 'Are you sure you want to delete this post?',
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: 'Delete', onPress: this._onConfirmDeletePost}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  // Deletes post from DB and fades post out before removing from store
  _onConfirmDeletePost = () => {
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
  // Navigation Callback Methods
  //--------------------------------------------------------------------//

  _onRespondToPost = () => {
    if (this.props.width || this.isRespondDisabled) { // width is only passed if on MessagesScreen
      return;
    }

    let convoId;
    let recipients;
    this.isRespondDisabled = true;

    // For HomeScreen, either go to author if post was sent directly, or group that that post was sent to
    if (this.props.postType === POST_TYPES.RECEIVED) {
      recipients = this.props.item.recipient_ids_with_client;
      if (recipients.length === 0) {
        convoId = this.props.item.author_id;
      } else if (recipients.length === 1) {
        convoId = this.props.item.recipient_ids_with_client[0] > 0 ? this.props.item.author_id : this.props.item.recipient_ids_with_client[0];
      } else {
        this.isRespondDisabled = false;
        return;
      }
    // For AuthoredScreen, go to recipient which is either a user or group
  } else if (this.props.postType === POST_TYPES.AUTHORED && this.props.isClient) {
      recipients = this.props.item.recipient_ids;
      if (recipients.length === 1) {
        convoId = this.props.item.recipient_ids[0];
        convoId = this.props.usersCache[convoId] && !this.props.usersCache[convoId].firebase_uid ? null : convoId; // handle the case if only a contact received the post
      } else {
        this.isRespondDisabled = false;
        return;
      }
    }

    if (convoId) {
      RN.Alert.alert('', 'Respond to this post as a message?',
        [{text: 'Cancel', onPress: () => this.isRespondDisabled = false, style: 'cancel'},
         {text: 'Respond', onPress: () => this._onConfirmRespondToPost(convoId)}],
         {onDismiss: () => this.isRespondDisabled = false}
      )
    }
  }

  _onConfirmRespondToPost(convoId) {
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
  // Post Header Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    let isRecipients = (this.props.postType === POST_TYPES.AUTHORED && this.props.isClient && this.props.item.recipient_ids_with_client.length > 0)
    || (this.props.item.recipient_ids.length + this.props.item.contact_phone_numbers.length > 0);

    return (
      <RN.View style={styles.headerView}>
        <RN.View style={styles.userView}>
          <EntityInfoViewContainer
            disableAvatar={this.props.client.id === this.props.item.author_id}
            disableUsername={this.props.client.id === this.props.item.author_id}
            entityId={this.props.item.author_id}
            marginLeft={0}
            maxWidth={isRecipients ? 50 : 100}
            />
          {this._renderRecipients()}
        </RN.View>
        <RN.View style={styles.iconView}>
          <RN.TouchableWithoutFeedback
            onPressIn={() => this.shareIcon.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
            onPressOut={() => this.shareIcon.setNativeProps({style: styles.shareIcon})}
            onPress={() => this.props.navigateTo('ShareScreen', { postId: this.props.item.id })}
            >
            <RN.View style={styles.shareButton}>
              <Icon ref={(ref) => this.shareIcon = ref} name={'share-alt'} style={styles.shareIcon} />
            </RN.View>
          </RN.TouchableWithoutFeedback>
          {this._renderCloseOrFlag()}
        </RN.View>
      </RN.View>
    )
  }

  _renderRecipients() {
    let numRecipients;
    let displayString = '';
    let callback;

    // If post is authored by client and on AuthoredPosts tab, render recipients of the post
    if (this.props.postType === POST_TYPES.AUTHORED && this.props.isClient) {
      numRecipients = this.props.item.recipient_ids.length + this.props.item.contact_phone_numbers.length;

      if (numRecipients === 0) {
        return null;
      } else if (numRecipients === 1) {
        entityId = this.props.item.recipient_ids[0] || this.props.item.contact_phone_numbers[0];
        displayString = getEntityDisplayName(entityId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
        callback = this._onRespondToPost;
      } else {
        displayString = numRecipients + ' recipients';
        callback = FunctionUtility.setStateCallback(this, { isModalVisible: true });
      }
    // Otherwise, render groups that client is a part of that received the post
    } else {
      numRecipients = this.props.item.recipient_ids_with_client.length;

      if (numRecipients === 0) {
        return null;
      } else if (numRecipients === 1) {
        convoId = this.props.item.recipient_ids_with_client[0];
        displayString = getEntityDisplayName(convoId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
        callback = this._onRespondToPost;
      } else {
        displayString = numRecipients + ' groups';
        callback = FunctionUtility.setStateCallback(this, { isModalVisible: true });
      }
    }

    return (
      <RN.View style={styles.usernameView}>
        <Ionicon name={'md-play'} style={[styles.playIcon, StyleUtility.UTILITY_STYLES.marginLeft5]}/>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.displayString.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.displayString.setNativeProps({style: [StyleUtility.UTILITY_STYLES.lightBlackText15, StyleUtility.UTILITY_STYLES.marginLeft5]})}
          style={styles.usernameView}
          onPress={callback}
          >
          <RN.View>
            <RN.Text
              ref={(ref) => this.displayString = ref}
              numberOfLines={1}
              style={[StyleUtility.UTILITY_STYLES.lightBlackText15, StyleUtility.UTILITY_STYLES.marginLeft5, { maxWidth: StyleUtility.scaleImage(50) }]}
              >
              {displayString}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  _renderCloseOrFlag() {
    // If in MessagesScreen and is own post, don't show the X
    if (this.props.client.id === this.props.item.author_id && this.props.width) {
      return null;
    } else if (this.props.client.id === this.props.item.author_id && !this.props.width) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.closeIcon.setNativeProps({style: StyleUtility.UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
          onPress={this._onPressDeletePost}
          >
          <RN.View style={styles.closeOrFlagButton}>
            <EvilIcons ref={(ref) => this.closeIcon = ref} name={'close'} style={styles.closeIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    } else {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.flagIcon.setNativeProps({style: StyleUtility.UTILITY_STYLES.textRed})}
          onPressOut={() => this.flagIcon.setNativeProps({style: styles.flagIcon})}
          onPress={this._onPressFlagPost}
          >
          <RN.View style={styles.closeOrFlagButton}>
            <Icon name={'flag'} ref={(ref) => this.flagIcon = ref} style={styles.flagIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
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
              <RN.Text style={[styles.bodyText, body.length > 85 && styles.smallBodyText]}>
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
      return null;
    } else if (media.length === 1) {
      height = StyleUtility.getScaledHeight(media[0], width);

      return (
        <MediumContainer
          medium={media[0]}
          containerStyle={styles.mediumContainer}
          mediumStyle={{ width: width, height: height }}
          imageUrls={FunctionUtility.getImageUrlsFromMedia(this.props.item.media, this.props.mediaCache)}
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
          containerStyle={styles.mediumContainer}
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
            {this.props.client.id === this.props.item.author_id || this.props.item.is_public ?
              <RN.Text style={styles.likeCountText}>
              {FunctionUtility.getReadableCount(this.props.item.num_likes)}
            </RN.Text> :
            null}
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.Text style={styles.dateText}>
          {(this.props.item.is_public ? 'Public | ' : '') + renderPostDate(this.props.item.created_at)}
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

  _renderListModal() {
    let recipientIds = this.props.postType === POST_TYPES.RECEIVED ? this.props.item.recipient_ids_with_client : this.props.item.recipient_ids;

    return (
      <ListModalContainer isModalVisible={this.state.isModalVisible} recipientIds={recipientIds} contactPhoneNumbers={this.props.item.contact_phone_numbers} postId={this.props.item.id} authorId={this.props.item.author_id} setParentState={this.setParentState} />
    )
  }

  _renderLoadingModal() {
    return (
      <LoadingModal isLoading={this.state.isLoading}/>
    )
  }

  //--------------------------------------------------------------------//
  // Other Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.View style={styles.container}>
        <RN.TouchableWithoutFeedback onPress={this._onRespondToPost} onLongPress={this._onPressLike}>
          <Animatable.View ref={(ref) => this.container = ref} style={[styles.postContainer, this.props.width && {width: this.props.width, elevation: 0, shadowRadius: 0, borderRadius: 20}]}>
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
