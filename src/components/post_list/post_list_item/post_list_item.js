// Library Imports
import React                         from 'react';
import RN                            from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import * as Animatable               from 'react-native-animatable';
import Icon                          from 'react-native-vector-icons/SimpleLineIcons';
import EvilIcons                     from 'react-native-vector-icons/EvilIcons';
import FontAwesome                   from 'react-native-vector-icons/FontAwesome';

// Local Imports
import { styles, scaleHeart }   from './post_list_item_styles.js';
import { renderDate }           from '../../../utilities/date_time_utility.js';
import fontelloConfig           from '../../../assets/fonts/config.json';
import { defaultErrorAlert }    from '../../../utilities/error_utility.js';
import { getImage, deleteFile } from '../../../utilities/file_utility.js';
import { setStateCallback }     from '../../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const IconFilled = createIconSetFromFontello(fontelloConfig);
const AnimatedIconFilled = Animatable.createAnimatableComponent(IconFilled);

class PostListItem extends React.Component {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl:         null,
      imageUrl:          null,
      isLikingAnimation: false,
      isLikingServer:    false,
    }

    this.isLikeDisabled   = false;
    this.isDeleteDisabled = false;
    this.isFollowDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.item.author_avatar_url) {
      this._setImageUrl(this.props.item.author_avatar_url, true);
    }

    if (this.props.item.image_url) {
      this._setImageUrl(this.props.item.image_url, false);
      getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.item.image_url);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id === this.props.item.author_id && nextProps.user.avatar_url != this.props.user.avatar_url) {
      this._setImageUrl(nextProps.user.avatar_url, true);
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setImageUrl(imageUrl, isAvatar) {
    getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, imageUrl)
      .then((data) => {
        if (isAvatar) {
          this.setState({ avatarUrl: data });
        } else {
          this.setState({ imageUrl: data });
        }
      });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressLike = () => {
    if (this.isLikeDisabled || this.state.isLikingAnimation || this.state.isLikingServer) {
      return;
    }

    this.isLikeDisabled = true;

    this.setState({ isLikingServer: true }, () => {
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

  _onConfirmDeletePost = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    this.props.deletePost(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.id)
      .then((deletedPost) => {
        if (this.props.item.image_url) {
          deleteFile(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.item.image_url);
        }

        this.container.fadeOut(500)
          .finally(() => {
            this.props.removePost({ post: deletedPost, userId: this.props.user.id  });
            this.isDeleteDisabled = false;
          });
      }, (error) => {
        this.isDeleteDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressFollow = () => {
    if (this.isFollowDisabled) {
      return;
    }

    this.isFollowDisabled = true;

    if (this.props.item.is_author_followed_by_user) {
      this._onPressUnfollow();
    } else {
      this.props.createFollow(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.item.author_id)
        .then(() => {
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
  // Render Methods
  //--------------------------------------------------------------------//

  _renderFollow() {
    if (this.props.item.author_id != this.props.user.id) {
      return (
        <RN.View style={styles.userView}>
          <RN.Text style={styles.breakText}>
            |
          </RN.Text>
          <RN.TouchableOpacity onPress={this._onPressFollow}>
            <RN.Text style={[styles.followText, !this.props.item.is_author_followed_by_user && styles.textHighlighted]}>
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
    if (!this.props.item.author_avatar_url) {
      return (
        <RN.View style={styles.frame}>
          <FontAwesome name='user-circle-o' style={styles.userIcon} />
        </RN.View>
      )
    } else if (!this.state.avatarUrl) {
      return (
        <RN.View style={styles.frame} />
      )
    } else {
      return (
        <RN.View style={styles.frame}>
          <RN.Image source={{uri: this.state.avatarUrl}} style={styles.avatarImage} resizeMode={'cover'} />
        </RN.View>
      )
    }
  }

  _renderUserView() {
    return (
        <RN.View style={styles.userView}>
            <RN.View style={styles.userButton}>
              <RN.View style={styles.frame}>
                {this._renderAvatar()}
              </RN.View>
              <RN.Text ref={(ref) => this.usernameText = ref} style={styles.usernameText}>
                {this.props.item.author_username}
              </RN.Text>
            </RN.View>
          {this._renderFollow()}
        </RN.View>
    )
  }

  _renderCloseButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.closeIcon.setNativeProps({style: styles.textHighlighted})}
        onPressOut={() => this.closeIcon.setNativeProps({style: styles.closeIcon})}
        onPress={this._onPressDeletePost}
        disabled={this.props.user.id != this.props.item.author_id}
        >
        <RN.View style={styles.closeButton}>
          <EvilIcons ref={(ref) => this.closeIcon = ref} name='close' style={[styles.closeIcon, (this.props.user.id != this.props.item.author_id) && styles.transparent]}/>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderHeader() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.usernameText.setNativeProps({style: styles.textHighlighted})}
        onPressOut={() => this.usernameText.setNativeProps({style: styles.usernameText})}
        onPress={() => this.props.navigateToProfile({ userId: this.props.item.author_id, username: this.props.item.author_username, avatarUrl: this.props.item.author_avatar_url, isFollowed: this.props.item.is_author_followed_by_user })}
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
          <RN.Image source={{uri: this.state.imageUrl}} style={styles.bodyImage} resizeMode={'cover'} />
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

  _renderLikesCount(count) {
    // If likes < 1000, render the number as-is
    if (count < 1000) {
      return count;
    // If likes are > 1000, return format 'xxx.xK'
    } else if (count < 1000000000){
      return (Math.floor(count / 100) / 10).toFixed(1) + 'K';
    // If likes are > 1 milion, return format 'xxx.xM'
    } else {
      return (Math.floor(count / 100000) / 10).toFixed(1) + 'M';
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
              {this._renderLikesCount(this.props.item.num_likes)}
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
        <Animatable.View ref={(ref) => this.container = ref} style={ styles.postContainer }>
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
