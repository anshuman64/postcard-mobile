// Library Imports
import React           from 'react';
import RN              from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import TabBar                            from '../tab_bar/tab_bar.js';
import { TAB_BAR_HEIGHT }                from '../tab_bar/tab_bar_styles.js';
import { styles, PROFILE_HEADER_HEIGHT } from './profile_header_styles.js';
import { FRIEND_TYPES }                  from '../../actions/friendship_actions.js';
import { UTILITY_STYLES }                from '../../utilities/style_utility.js';
import { defaultErrorAlert }             from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//

class ProfileHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl:  null,
    }

    this.isFriendDisabled = false;
    this.isFollowDisabled = false;
  }


  //--------------------------------------------------------------------//
  // Friend Callback Methods
  //--------------------------------------------------------------------//

  _onPressFriend = () => {
    if (this.isFriendDisabled) {
      return;
    }

    this.isFriendDisabled = true;

    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;

    if (!friendshipStatus) {
      this.props.createFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFriendDisabled = false;
        });
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
      this.props.acceptFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
        .then((friendship) => {
          this.props.acceptFriendshipRequest({ friendship: friendship });
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isFriendDisabled = false;
        });
    } else {
      this._onPressUnfriend();
    }
  }

  _onPressUnfriend = () => {
    let alertString;
    let cancelString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;

    if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      alertString = 'Are you sure you want to remove this friend?';
      cancelString = 'Remove';
    } else if (friendshipStatus === FRIEND_TYPES.SENT) {
      alertString = 'Are you sure you want to cancel this friend request?';
      cancelString = 'Cancel';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED){
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    }

    RN.Alert.alert('', alertString,
      [{text: 'Cancel', onPress: () => this.isFriendDisabled = false, style: 'cancel'},
       {text: cancelString, onPress: this._onConfirmUnfriend}],
       {onDismiss: () => this.isFriendDisabled = false}
    )
  }

  _onConfirmUnfriend = () => {
    this.props.deleteFriendship(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.props.removeFriendship({ friendship: friendship });
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFriendDisabled = false;
      });
  }


  //--------------------------------------------------------------------//
  // Follow Callback Methods
  //--------------------------------------------------------------------//

  // Creates or deletes follow from DB
  _onPressFollow = () => {
    if (this.isFollowDisabled) {
      return;
    }

    this.isFollowDisabled = true;

    if (this.props.usersCache[this.props.userId].is_user_followed_by_client) {
      this._onPressUnfollow();
    } else {
      this.props.createFollow(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
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
    RN.Alert.alert('', 'Are you sure you want to unfollow this user?',
      [{text: 'Cancel', onPress: () => this.isFollowDisabled = false, style: 'cancel'},
       {text: 'Unfollow', onPress: this._onConfirmUnfollow}],
       {onDismiss: () => this.isFollowDisabled = false}
    )
  }

  // Deletes follow from DB and updates ProfileScreen as necessary
  _onConfirmUnfollow = () => {
    this.props.deleteFollow(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
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

  _renderAvatar() {
    let avatarUrl = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].avatar_url : null;

    if (!avatarUrl) {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.client.id != this.props.userId}>
          <RN.View style={styles.frameBorder}>
            <Icon name='user' style={styles.userIcon} />
          </RN.View>
          <Icon name='pencil' style={[styles.avatarPencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    } else if (avatarUrl && !this.props.imagesCache[avatarUrl]) {
      return (
        <RN.View style={styles.frame} />
      )
    } else {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.client.id != this.props.userId}>
          <CachedImage
            source={{uri: this.props.imagesCache[avatarUrl].url}}
            style={styles.image}
            resizeMode={'cover'}
            onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarUrl)}
            />
          <Icon name='pencil' style={[styles.avatarPencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderUsername() {
    let username = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].username : null;

    return (
      <RN.TouchableOpacity
        style={styles.usernameButton}
        onPress={() => this.props.navigateTo('UsernameScreen')} 
        disabled={this.props.client.id != this.props.userId}
        >
        <RN.Text style={styles.usernameText}>
          {username}
        </RN.Text>
        <Icon name='pencil' style={[styles.pencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
      </RN.TouchableOpacity>
    )
  }

  _renderButtons() {
    let friendString;
    let friendshipStatus = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].friendship_status_with_client : null;
    let disableButton = friendshipStatus === FRIEND_TYPES.SENT || friendshipStatus === FRIEND_TYPES.ACCEPTED;
    let isFollowed = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].is_user_followed_by_client : false;

    if (friendshipStatus === FRIEND_TYPES.SENT) {
      friendString = 'Cancel';
      iconName = 'user-unfollow';
    } else if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      friendString = 'Friends';
      iconName = 'user-following';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
      friendString = 'Accept';
      iconName = 'user-follow';
    } else {
      friendString = 'Add Friend';
      iconName = 'user-follow';
    }

    if (this.props.client.id != this.props.userId) {
      return (
        <RN.View style={styles.buttonView}>
          <RN.TouchableOpacity
            style={[styles.friendButtonBackground, disableButton && styles.buttonBackgroundDisabled]}
            onPress={this._onPressFriend}
            >
            <Icon name={iconName} style={[styles.friendIcon, disableButton && styles.buttonTextDisabled]} />
            <RN.Text style={[UTILITY_STYLES.lightWhiteText15, disableButton && styles.buttonTextDisabled]}>
              {friendString}
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity
            style={[styles.followButtonBackground, isFollowed && styles.buttonBackgroundDisabled]}
            onPress={this._onPressFollow}
            >
            <RN.Text style={[UTILITY_STYLES.lightWhiteText15, UTILITY_STYLES.textHighlighted, isFollowed && styles.buttonTextDisabled]}>
              { isFollowed ? 'Following' : 'Follow' }
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={{ height: 30 }} />
      )
    }
  }

  render() {
    const translateY = this.props.scrollY.interpolate({
      inputRange: [0, (PROFILE_HEADER_HEIGHT - TAB_BAR_HEIGHT)],
      outputRange: [0, -(PROFILE_HEADER_HEIGHT - TAB_BAR_HEIGHT)],
      extrapolate: 'clamp',
    });

    return (
      <RN.Animated.View style={[styles.container, { transform: [{translateY}] }]}
        >
        <RN.View style={styles.userView}>
          {this._renderAvatar()}
          <RN.View style={styles.usernameView}>
            {this._renderUsername()}
            {this._renderButtons()}
          </RN.View>
        </RN.View>
        <TabBar screen={this.props.screen} setParentState={this.props.setParentState} postType={this.props.postType} />
      </RN.Animated.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileHeader;
