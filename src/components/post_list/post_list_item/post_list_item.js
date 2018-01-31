// Library Imports
import React                         from 'react';
import RN                            from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable               from 'react-native-animatable';
import Icon                          from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon                       from 'react-native-vector-icons/Ionicons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';

// Local Imports
import { styles, scaleHeart }                 from './post_list_item_styles.js';
import { renderDate }                         from '../../../utilities/date_time_utility.js';
import fontelloConfig                         from '../../../assets/fonts/config.json';
import { defaultErrorAlert }                  from '../../../utilities/error_utility.js';
import { getFile, deleteFile }               from '../../../utilities/file_utility.js';
import { setStateCallback, getReadableCount } from '../../../utilities/function_utility.js';
import { UTILITY_STYLES, COLORS }             from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//

const AnimatedIonicon = Animatable.createAnimatableComponent(Ionicon);

class PostListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isLikingAnimation: false, // if the liking animation is still playing
      isLikingServer:    false, // if the server is still registering the create/delete like
    }

    this.isLikeDisabled   = false;
    this.isFlagDisabled   = false;
    this.isDeleteDisabled = false;
    this.isFollowDisabled = false;
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
    if (this.props.item.is_flagged_by_user) {
      this.props.deleteFlag(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFlagDisabled = false;
        });
    // If post is not flagged, pop alert asking user to confirm
    } else {
      RN.Alert.alert(
        '',
        'Are you sure you want to flag this post as inappropriate?',
        [
          {text: 'Cancel', onPress: () => this.isFlagDisabled = false, style: 'cancel'},
          {text: 'Flag', onPress: this._onConfirmFlagPost},
        ],
        {
          onDismiss: () => this.isFlagDisabled = false
        }
      )
    }
  }

  // Creates flag
  _onConfirmFlagPost = () => {
    this.props.createFlag(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
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
    if (this.props.item.is_author_followed_by_user) {
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

  //--------------------------------------------------------------------//
  // Other Callback Methods
  //--------------------------------------------------------------------//

  // Navigates to profile of user and sends appropriate props
  _navigateToProfile = () => {
    this.props.navigateToProfile({
      userId: this.props.item.author_id,
      username: this.props.item.author_username,
      avatarUrl: this.props.item.author_avatar_url,
      isFollowed: this.props.item.is_author_followed_by_user
    });
  }

  //--------------------------------------------------------------------//
  // Render Methods
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
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.usernameText.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.usernameText.setNativeProps({style: [UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5]})}
          onPress={this._navigateToProfile}
          disabled={this.props.user.id === this.props.item.author_id}
          >
          <RN.View style={styles.usernameView}>
            <RN.View style={styles.frame}>
              {this._renderAvatar()}
            </RN.View>
            <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5]}>
              {this.props.user.id === this.props.item.author_id ? this.props.user.username : this.props.item.author_username}
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
        {this._renderFollowText()}
      </RN.View>
    )
  }

  _renderAvatar() {
    let avatarUrl;

    if (this.props.user.id === this.props.item.author_id && this.props.user.avatar_url) {
      avatarUrl = this.props.user.avatar_url;
    } else if (this.props.item.author_avatar_url) {
      avatarUrl = this.props.item.author_avatar_url;
    }

    if (avatarUrl) {
      return (
        <RN.Image
          source={{uri: this.props.images[avatarUrl].url, cache: 'force-cache'}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.getImage(this.props.firebaseUserObj, avatarUrl)}
          />
      )
    } else if (avatarUrl && !this.props.images[avatarUrl]) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <Icon name='user' style={styles.userIcon} />
      )
    }
  }

  _renderFollowText() {
    if (this.props.user.id != this.props.item.author_id) {
      return (
        <RN.View style={styles.usernameView}>
          <RN.Text style={[UTILITY_STYLES.regularBlackText15, UTILITY_STYLES.marginLeft5]}>
            |
          </RN.Text>
          <RN.TouchableOpacity style={styles.usernameView} onPress={this._onPressFollow}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText15, UTILITY_STYLES.marginLeft5, !this.props.item.is_author_followed_by_user && UTILITY_STYLES.textHighlighted]}>
              {this.props.item.is_author_followed_by_user ? 'Following' : 'Follow'}
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return null;
    }
  }

  _renderCloseOrFlag() {
    if (this.props.user.id === this.props.item.author_id) {
      return (
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.closeIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})}
          onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
          onPress={this._onPressDeletePost}
          >
          <RN.View style={styles.closeOrFlagButton}>
            <EvilIcons
              ref={(ref) => this.closeIcon = ref}
              name={'close'}
              style={styles.closeIcon}
              />
          </RN.View>
        </RN.TouchableWithoutFeedback>
      )
    } else {
      return (
        <RN.TouchableWithoutFeedback onPress={this._onPressFlagPost} >
          <RN.View style={styles.closeOrFlagButton}>
            <Ionicon
              name={this.props.item.is_flagged_by_user ? 'ios-flag' : 'ios-flag-outline'}
              style={[styles.flagIcon, this.props.item.is_flagged_by_user && UTILITY_STYLES.textRed]}
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
    if (this.props.item.image_url && this.props.images[this.props.item.image_url]) {
      return (
        <RN.View style={styles.bodyImageView}>
          <RN.TouchableWithoutFeedback onLongPress={this._onPressLike}>
            <RN.Image
              source={{uri: this.props.images[this.props.item.image_url].url, cache: 'force-cache'}}
              style={styles.bodyImage}
              resizeMode={'contain'}
              onError={() => this.props.getImage(this.props.firebaseUserObj, this.props.item.image_url)}
              />
          </RN.TouchableWithoutFeedback>
          <RN.ActivityIndicator size='small' color={COLORS.grey500} style={{position: 'absolute'}}/>
        </RN.View>
      )
    } else if (this.props.item.image_url && !this.props.images[this.props.item.image_url]) {
      return (
        <RN.View style={styles.bodyImage} />
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
          {renderDate(this.props.item.created_at)}
        </RN.Text>
      </RN.View>
    )
  }

  _renderLike() {
    if ((!this.props.item.is_liked_by_user && !(!this.state.isLikingServer && !this.state.isLikingAnimation))
        || this.props.item.is_liked_by_user) {
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

  //--------------------------------------------------------------------//
  // Other Render Methods
  //--------------------------------------------------------------------//

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
