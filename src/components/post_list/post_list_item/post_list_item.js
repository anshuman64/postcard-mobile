// Library Imports
import React                         from 'react';
import RN                            from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable               from 'react-native-animatable';
import Icon                          from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';
import FontAwesome                   from 'react-native-vector-icons/FontAwesome';

// Local Imports
import { styles, scaleHeart }                 from './post_list_item_styles.js';
import { renderDate }                         from '../../../utilities/date_time_utility.js';
import fontelloConfig                         from '../../../assets/fonts/config.json';
import { defaultErrorAlert }                  from '../../../utilities/error_utility.js';
import { getImage, deleteFile }               from '../../../utilities/file_utility.js';
import { setStateCallback, renderLikesCount } from '../../../utilities/function_utility.js';
import { UTILITY_STYLES }                     from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//

// Imports custom filled-icon set
const IconFilled = createIconSetFromFontello(fontelloConfig);
const AnimatedIconFilled = Animatable.createAnimatableComponent(IconFilled);

class PostListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl:         null,
      imageUrl:          null,
      isLikingAnimation: false, // if the liking animation is still playing
      isLikingServer:    false, // if the server is still registering the create/delete like
    }

    this.isUser           = false;
    this.isLikeDisabled   = false;
    this.isDeleteDisabled = false;
    this.isFollowDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Gets images for avatar and post if they exist
  componentDidMount() {
    // Set bool as variable to be used throughout code
    this.isUser = this.props.user.id === this.props.item.author_id;

    // If post is authored by current user, use user.avatar_url for avatar
    if (this.isUser && this.props.user.avatar_url) {
      this._setImageUrl(this.props.user.avatar_url, true);
    // Else, use item.author_avatar_url for avatar
    } else if (this.props.item.author_avatar_url) {
      this._setImageUrl(this.props.item.author_avatar_url, true);
    }

    // If post has an image, get image
    if (this.props.item.image_url) {
      this._setImageUrl(this.props.item.image_url, false);
    }
  }

  componentWillReceiveProps(nextProps) {
    // If current user has changed avatar, update post with new avatar
    if (this.isUser && nextProps.user.avatar_url != this.props.user.avatar_url) {
      if (nextProps.user.avatar_url) {
        this._setImageUrl(nextProps.user.avatar_url, true);
      // If user has removed avatar, update appropriately
      } else {
        this.setState({ avatarUrl: null });
      }
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Gets image from AWS S3 using key and sets state with signed URL
  _setImageUrl(imageUrl, isAvatar) {
    getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, imageUrl)
      .then((data) => {
        if (isAvatar) {
          this.setState({ avatarUrl: data });
        } else {
          this.setState({ imageUrl: data });
        }
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Creates/deletes like and handles animation
  _onPressLike = () => {
    if (this.isLikeDisabled || this.state.isLikingAnimation || this.state.isLikingServer) {
      return;
    }

    this.isLikeDisabled = true;

    this.setState({ isLikingServer: true }, () => {
      // If post already liked, delete like
      if (this.props.item.is_liked_by_user) {
        this.props.deleteLike(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
          .catch((error) => {
            defaultErrorAlert(error);
          })
          .finally(() => {
            this.isLikeDisabled = false;
            this.setState({ isLikingServer: false });
          });
      } else {
        this.props.createLike(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
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

  // Alert that pops up when a user is about to delete a post
  _onPressDeletePost = () => {
    RN.Alert.alert(
      '',
      'Are you sure you want to delete this post?',
      [
        {text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
        {text: 'Delete', onPress: this._onConfirmDeletePost},
      ],
      {
        onDismiss: () => this.isDeleteDisabled = false
      }
    )
  }

  // Deletes post from DB and fades post out before removing from store
  _onConfirmDeletePost = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    // Delete post from DB
    this.props.deletePost(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
      .then((deletedPost) => {
        // Delete image file from AWS S3
        if (this.props.item.image_url) {
          deleteFile(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.item.image_url);
        }
        // Fade out post
        this.container.fadeOut(500)
          .finally(() => {
            // Remove post from store
            this.props.removePost({ post: deletedPost, userId: this.props.user.id  });
            this.isDeleteDisabled = false;
          });
      }, (error) => {
        this.isDeleteDisabled = false;
        defaultErrorAlert(error);
      });
  }

  // Creates or deletes follow from DB
  _onPressFollow = () => {
    if (this.isFollowDisabled) {
      return;
    }

    this.isFollowDisabled = true;

    if (this.props.item.is_author_followed_by_user) {
      this._onPressUnfollow();
    // If user is not followed, create follow
    } else {
      this.props.createFollow(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.author_id)
        .then(() => {
          // If on profileScreen, update follow state to make sure ProfileHeader is also updated
          if (this.props.setFollowState) {
            this.props.setFollowState({ isFollowed: true });
          }
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFollowDisabled = false;
        });
    }
  }

  // Alert for when a user is about to unfollow
  _onPressUnfollow = () => {
    RN.Alert.alert(
      '',
      'Are you sure you want to unfollow this user?',
      [
        {text: 'Cancel', onPress: () => this.isFollowDisabled = false, style: 'cancel'},
        {text: 'Unfollow', onPress: this._onConfirmUnfollow},
      ],
      {
        onDismiss: () => this.isFollowDisabled = false
      }
    )
  }

  // Deletes follow from DB and updates ProfileScreen as necessary
  _onConfirmUnfollow = () => {
    this.props.deleteFollow(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.author_id)
      .then(() => {
        if (this.props.setFollowState) {
          this.props.setFollowState({ isFollowed: false });
        }
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFollowDisabled = false;
      });
  }

  // Navigates to profile of user and sends appropriate props
  _navigateToProfile = () => {
    if (!this.isUser) {
      this.props.navigateToProfile({
        userId: this.props.item.author_id,
        username: this.props.item.author_username,
        avatarUrl: this.props.item.author_avatar_url,
        isFollowed: this.props.item.is_author_followed_by_user
      })
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderFollow() {
    if (!this.isUser) {
      return (
        <RN.View style={styles.userView}>
          <RN.Text style={[UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5]}>
            |
          </RN.Text>
          <RN.TouchableOpacity onPress={this._onPressFollow}>
            <RN.Text style={[UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5, !this.props.item.is_author_followed_by_user && UTILITY_STYLES.textHighlighted]}>
              {this.props.item.is_author_followed_by_user ? 'Following' : 'Follow'}
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderAvatar() {
    if (this.state.avatarUrl) {
      return (
        <RN.Image source={{uri: this.state.avatarUrl}} style={styles.avatarImage} resizeMode={'cover'} />
      )
    } else if (!this.props.item.author_avatar_url && !this.state.avatarUrl) {
      return (
        <FontAwesome name='user-circle-o' style={styles.userIcon} />
      )
    } else {
      return null;
    }
  }

  _renderUserView() {
    return (
        <RN.View style={styles.userView}>
            <RN.View style={styles.userButton}>
              <RN.View style={styles.frame}>
                {this._renderAvatar()}
              </RN.View>
              <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5]}>
                {this.isUser ? this.props.user.username : this.props.item.author_username}
              </RN.Text>
            </RN.View>
          {this._renderFollow()}
        </RN.View>
    )
  }

  _renderCloseButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.closeIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
        onPress={this._onPressDeletePost}
        disabled={!this.isUser}
        >
        <RN.View style={styles.closeButton}>
          <EvilIcons
            ref={(ref) => this.closeIcon = ref}
            name='close'
            style={[styles.closeIcon, !this.isUser && styles.transparent]}
            />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderHeader() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
        onPressOut={() => this.usernameText.setNativeProps({style: styles.usernameText})}
        onPress={this._navigateToProfile}
        >
        <RN.View style={styles.headerView}>
          {this._renderUserView()}
          {this._renderCloseButton()}
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderBody() {
    if (this.props.item.body) {
      return (
        <RN.TouchableWithoutFeedback onLongPress={this._onPressLike}>
          <RN.View>
            <RN.Text style={[styles.bodyText, this.props.item.body.length > 85 && styles.smallBodyText]}>
              {this.props.item.body}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderImage() {
    if (this.props.item.image_url && !this.state.imageUrl) {
      return (
        <RN.View style={styles.bodyImage} />
      )
    } else if (this.state.imageUrl) {
      return (
        <RN.TouchableWithoutFeedback onLongPress={this._onPressLike}>
          <RN.Image source={{uri: this.state.imageUrl}} style={styles.bodyImage} resizeMode={'contain'} />
        </RN.TouchableWithoutFeedback>
      )
    }
  }

  _renderLike() {
    if ((!this.props.item.is_liked_by_user && !(!this.state.isLikingServer && !this.state.isLikingAnimation))
        || this.props.item.is_liked_by_user) {
      return (
        <AnimatedIconFilled
          name='heart-filled'
          animation={scaleHeart}
          duration={750}
          style={ styles.filledHeartIcon }
          onAnimationBegin={setStateCallback(this, { isLikingAnimation: true })}
          onAnimationEnd={setStateCallback(this, { isLikingAnimation: false })}
          />
      )
    } else {
      return (
        <Icon name='heart' style={ styles.heartIcon } />
      )
    }
  }

  _renderFooter() {
    return (
      <RN.View style={ styles.footerView }>
        <RN.TouchableWithoutFeedback onPressIn={this._onPressLike}>
          <RN.View style={styles.likesView}>
            <RN.View style={styles.heartButton}>
              {this._renderLike()}
            </RN.View>
            <RN.Text style={ styles.likeCountText }>
              {renderLikesCount(this.props.item.num_likes)}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.Text style={ styles.dateText }>
          {renderDate(this.props.item.created_at)}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return(
      <RN.View style={styles.container}>
        <Animatable.View ref={(ref) => this.container = ref} style={styles.postContainer}>
          {this._renderHeader()}
          {this._renderBody()}
          {this._renderImage()}
          {this._renderFooter()}
        </Animatable.View>
      </RN.View>
    )
  }
}



//--------------------------------------------------------------------//

export default PostListItem;
