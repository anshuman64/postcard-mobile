// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Hyperlink       from 'react-native-hyperlink'
import Ionicon         from 'react-native-vector-icons/Ionicons';
import EvilIcons       from 'react-native-vector-icons/EvilIcons';

// Local Imports
import ListModalContainer                     from '../list_modal/list_modal_container';
import UserInfoViewContainer                  from '../user_info_view/user_info_view_container';
import { FRIEND_TYPES }                       from '../../actions/friendship_actions';
import { POST_TYPES }                       from '../../actions/post_actions';
import { styles, scaleHeart }                 from './post_list_item_styles';
import { renderPostDate }                     from '../../utilities/date_time_utility';
import { defaultErrorAlert }                  from '../../utilities/error_utility';
import { setStateCallback, getReadableCount, getConvoDisplayName } from '../../utilities/function_utility';
import { UTILITY_STYLES, COLORS }             from '../../utilities/style_utility';

//--------------------------------------------------------------------//

const AnimatedIonicon = Animatable.createAnimatableComponent(Ionicon);

/*
Required Passed Props:
  item (object): post object to render
  postType (string): used as a proxy for which screen we are on
Optional Passed Props:
  width (int): width of messages; only passed if on MessagesScreen
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
    }

    this.isLikeDisabled   = false;
    this.isFlagDisabled   = false;
    this.isDeleteDisabled = false;
    this.isFollowDisabled = false;
    this.recipients       = null;
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
    RN.Alert.alert('', 'Are you sure you want to delete this post?',
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: 'Delete', onPress: this._onConfirmDeletePost}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  // Deletes post from DB and fades post out before removing from store
  _onConfirmDeletePost = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

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
  // Follow User Callback Methods
  //--------------------------------------------------------------------//

  // Creates or deletes follow from DB
  _onPressFollow = () => {
    if (this.isFollowDisabled) {
      return;
    }

    this.isFollowDisabled = true;

    // If user is followed, pop alert confirming unfollow
    if (this.props.usersCache[this.props.item.author_id].is_user_followed_by_client) {
      RN.Alert.alert('', 'Are you sure you want to unfollow this user?',
        [{text: 'Cancel', onPress: () => this.isFollowDisabled = false, style: 'cancel'},
         {text: 'Unfollow', onPress: this._onConfirmUnfollow}],
         {onDismiss: () => this.isFollowDisabled = false}
      )
    // If user is not followed, create follow
    } else {
      this.props.createFollow(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.item.author_id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFollowDisabled = false;
        });
    }
  }

  // Deletes follow from DB and updates ProfileScreen as necessary
  _onConfirmUnfollow = () => {
    this.props.deleteFollow(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.item.author_id)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFollowDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Navigation Callback Methods
  //--------------------------------------------------------------------//

  // TODO: add loading state
  _onNavigateToMessages = () => {
    let isMessagesScreen = this.props.width; // width is only passed if on MessagesScreen
    let user = this.props.usersCache[this.props.item.author_id];
    let userFriendshipStatus = user ? user.friendship_status_with_client : null;

    if (!isMessagesScreen && userFriendshipStatus && userFriendshipStatus === FRIEND_TYPES.ACCEPTED) {
      this.props.createMessage(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.client.id, user.id, null, null, null, this.props.item.id)
        .then(() => {
          this.props.navigateTo('MessagesScreen', { convoId: this.props.item.author_id });
        })
        .catch((error) => {
          defaultErrorAlert(error);
        });
    }
  }

  //--------------------------------------------------------------------//
  // Post Header Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <RN.View style={styles.headerView}>
        {this._renderUserView()}
        {this._renderCloseOrFlag()}
      </RN.View>
    )
  }

  _renderUserView() {
    return (
      <RN.View style={styles.userView}>
        <UserInfoViewContainer
          disabled={this.props.client.id === this.props.item.author_id}
          convoId={this.props.item.author_id}
          marginLeft={0}
          />
        {this._renderReceivedRecipients()}
        {this._renderAuthoredRecipients()}
        {this._renderFollowText()}
      </RN.View>
    )
  }

  _renderReceivedRecipients() {
    if (this.props.postType === POST_TYPES.RECEIVED) {
      let numRecipients = this.props.item.recipient_ids_with_client.length;
      let displayString  = '';
      let callback;

      if (numRecipients === 0) {
        return null;
      } else if (numRecipients === 1) {
        convoId = this.props.item.recipient_ids_with_client[0];
        if (convoId > 0) {
          displayString = 'You';
          callback = () => this.props.navigateTo('MessagesScreen', { convoId: this.props.item.author_id });
        } else {
          displayString = getConvoDisplayName(convoId, this.props.usersCache, this.props.groupsCache);
          callback = () => this.props.navigateTo('MessagesScreen', { convoId: this.props.item.recipient_ids_with_client[0] }); //NOTE: don't use convoId variable, because callback is in different scope
        }
      } else {
        displayString = numRecipients + ' groups';
        callback = setStateCallback(this, { isModalVisible: true });
      }

      return this._renderRecipients(displayString, callback);
    } else {
      return null;
    }
  }

  _renderAuthoredRecipients() {
    if (this.props.postType === POST_TYPES.AUTHORED) {
      let numRecipients = this.props.item.recipient_ids.length;
      let displayString  = '';
      let callback;

      if (numRecipients === 0) {
        return null;
      } else if (numRecipients === 1) {
        convoId = this.props.item.recipient_ids[0];
        displayString = getConvoDisplayName(convoId, this.props.usersCache, this.props.groupsCache);
        callback = () => this.props.navigateTo('MessagesScreen', { convoId: this.props.item.recipient_ids[0] });
      } else {
        displayString = numRecipients + ' recipients';
        callback = setStateCallback(this, { isModalVisible: true });
      }

      return this._renderRecipients(displayString, callback);
    } else {
      return null;
    }
  }

  _renderRecipients(displayString, callback) {
    return (
      <RN.View style={styles.usernameView}>
        <RN.Text style={UTILITY_STYLES.regularBlackText15}>{'>  '}</RN.Text>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.displayString.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.displayString.setNativeProps({style: UTILITY_STYLES.regularBlackText15})}
          style={styles.usernameView}
          onPress={callback}
          >
          <RN.View>
            <RN.Text ref={(ref) => this.displayString = ref}  style={UTILITY_STYLES.regularBlackText15}>
              {displayString}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  _renderFollowText() {
    if (this.props.postType != POST_TYPES.RECEIVED && this.props.client.id != this.props.item.author_id) {
      let isFollowedByClient = this.props.usersCache[this.props.item.author_id].is_user_followed_by_client;

      return (
        <RN.View style={styles.usernameView}>
          <RN.Text style={UTILITY_STYLES.regularBlackText15}>{' | '}</RN.Text>
          <RN.TouchableOpacity style={styles.usernameView} onPress={this._onPressFollow}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText15, !isFollowedByClient && UTILITY_STYLES.textHighlighted]}>
              {isFollowedByClient ? 'Following' : 'Follow'}
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderCloseOrFlag() {
    // If in MessagesScreen and is own post, don't show the X
    if (this.props.client.id === this.props.item.author_id && this.props.width) {
      return null;
    } else if (this.props.client.id === this.props.item.author_id && !this.props.width) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.closeIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
          onPress={this._onPressDeletePost}
          >
          <RN.View style={styles.closeOrFlagButton}>
            <EvilIcons ref={(ref) => this.closeIcon = ref} name={'close'} style={styles.closeIcon} />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    } else {
      let isFlaggedByClient = this.props.item.is_flagged_by_client;

      return (
        <RN.TouchableWithoutFeedback onPress={this._onPressFlagPost} >
          <RN.View style={styles.closeOrFlagButton}>
            <Ionicon
              name={isFlaggedByClient ? 'ios-flag' : 'ios-flag-outline'}
              style={[styles.flagIcon, isFlaggedByClient && UTILITY_STYLES.textRed]}
              />
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
        <RN.TouchableWithoutFeedback onPress={this._onNavigateToMessages} onLongPress={this._onPressLike}>
          <RN.View style={styles.bodyView}>
            <RN.View style={styles.bodyTextView}>
              <Hyperlink linkDefault={true} linkStyle={UTILITY_STYLES.textHighlighted}>
                <RN.Text style={[styles.bodyText, body.length > 85 && styles.smallBodyText]}>
                  {body}
                </RN.Text>
              </Hyperlink>
            </RN.View>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderImage() {
    let imagePath = this.props.item.image_url;
    let width = this.props.width;

    if (imagePath && this.props.imagesCache[imagePath]) {
      return (
        <RN.View style={[styles.bodyImageView, width && {height: width, width: width}]}>
          <RN.TouchableWithoutFeedback onPress={this._onNavigateToMessages} onLongPress={this._onPressLike}>
            <RN.Image
              source={{uri: this.props.imagesCache[imagePath].url}}
              style={[styles.bodyImage, width && {height: width, width: width}]}
              resizeMode={'contain'}
              onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, imagePath)}
              />
          </RN.TouchableWithoutFeedback>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else if (imagePath && !this.props.imagesCache[imagePath]) {
      return (
        <RN.View style={[styles.bodyImageView, width && {height: width, width: width}]}>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else {
      return null;
    }
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
            <RN.Text style={styles.likeCountText}>
              {getReadableCount(this.props.item.num_likes)}
            </RN.Text>
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
          onAnimationBegin={setStateCallback(this, { isLikingAnimation: true })}
          onAnimationEnd={setStateCallback(this, { isLikingAnimation: false })}
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
      <ListModalContainer isModalVisible={this.state.isModalVisible} recipientIds={recipientIds} authorId={this.props.item.author_id} setParentState={this.setParentState} />
    )
  }

  //--------------------------------------------------------------------//
  // Other Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.View style={styles.container}>
        <Animatable.View ref={(ref) => this.container = ref} style={[styles.postContainer, this.props.width && {width: this.props.width, elevation: 0, shadowRadius: 0, borderRadius: 20}]}>
          {this._renderHeader()}
          {this._renderBody()}
          {this._renderImage()}
          {this._renderFooter()}
        </Animatable.View>
        {this._renderListModal()}
      </RN.View>
    )
  }
}



//--------------------------------------------------------------------//

export default PostListItem;
