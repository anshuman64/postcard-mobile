// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import TabBarContainer                   from '../tab_bar/tab_bar_container';
import AvatarContainer                   from '../avatar/avatar_container';
import { TAB_BAR_HEIGHT }                from '../tab_bar/tab_bar_styles';
import { styles, PROFILE_HEADER_HEIGHT } from './profile_header_styles';
import { FRIEND_TYPES }                  from '../../actions/friendship_actions';
import { UTILITY_STYLES }                from '../../utilities/style_utility';
import { defaultErrorAlert }             from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  userId (int): id of user to render header for
  scrollY (object): animation object
Optional Passed Props:
  isClient (bool): if the profile header is for the client
*/
class ProfileHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl:  null,
    }

    this.isFriendDisabled   = false;
    this.isUnfriendDisabled = false;
    this.isBlockDisabled    = false;
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
        .then((friendship) => {
          this.props.sendFriendshipRequest({ friendship: friendship });
        })
        .catch((error) => {
          if (error.message === 'Requester blocked by requestee') {
            RN.Alert.alert('', 'You have been blocked by this user.', [{text: 'OK', style: 'cancel'}]);
          } else if (error.message === 'Requestee blocked by requester') {
            RN.Alert.alert('', 'You have blocked this user.', [{text: 'OK', style: 'cancel'}]);
          } else {
            defaultErrorAlert(error);
          }
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
      this.isFriendDisabled = false;
      this._onPressUnfriend();
    }
  }

  _onPressUnfriend = () => {
    if (this.isUnfriendDisabled) {
      return;
    }

    this.isUnfriendDisabled = true;

    let alertString;
    let cancelString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;

    if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      alertString = 'Are you sure you want to remove this friend?';
      cancelString = 'Remove';
    } else if (friendshipStatus === FRIEND_TYPES.SENT) {
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED){
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    }

    RN.Alert.alert('', alertString,
      [{text: 'Cancel', onPress: () => this.isUnfriendDisabled = false, style: 'cancel'},
       {text: cancelString, onPress: this._onConfirmUnfriend}],
       {onDismiss: () => this.isUnfriendDisabled = false}
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
        this.isUnfriendDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Block Callback Methods
  //--------------------------------------------------------------------//

  // Creates or deletes follow from DB
  _onPressBlock = () => {
    if (this.isBlockDisabled) {
      return;
    }

    this.isBlockDisabled = true;

    if (this.props.usersCache[this.props.userId].is_user_blocked_by_client) {
      this.props.deleteBlock(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
        .then((block) => {
          this.props.removeBlock({ block: block });
        })
        .catch((error) => {
          defaultErrorAlert(error);
        })
        .finally(() => {
          this.isBlockDisabled = false;
        });
    } else {
      this._onPressBlockAlert();
    }
  }

  // Alert for when a user is about to block
  _onPressBlockAlert = () => {
    RN.Alert.alert('', "Are you sure you want to block this user? You can't be this user's friend and won't see this user's posts.",
      [{text: 'Cancel', onPress: () => this.isBlockDisabled = false, style: 'cancel'},
       {text: 'Block', onPress: this._onConfirmBlock}],
       {onDismiss: () => this.isBlockDisabled = false}
    )
  }

  // Deletes follow from DB and updates ProfileScreen as necessary
  _onConfirmBlock = () => {
    this.props.createBlock(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then(() => {
        this._onConfirmUnfriend();
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isBlockDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderChangeText() {
    if (this.props.client.id === this.props.userId) {
      return (
        <RN.Text style={[UTILITY_STYLES.lightBlackText15, {marginTop: 2}, UTILITY_STYLES.textHighlighted]}>
          Change
        </RN.Text>
      )
    } else {
      return null;
    }
  }

  _renderUsername() {
    let user = this.props.usersCache[this.props.userId];
    let username = user ? user.username : null;

    return (
      <RN.TouchableOpacity
        style={[styles.usernameButton, this.props.client.id === this.props.userId && {marginBottom: 15}]}
        onPress={() => this.props.navigateTo('UsernameScreen', { screen: 'UsernameScreen' })}
        disabled={this.props.client.id != this.props.userId}
        >
        <RN.Text style={styles.usernameText} numberOfLines={1}>
          {username}
        </RN.Text>
        <Icon name='pencil' style={[styles.pencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
      </RN.TouchableOpacity>
    )
  }

  _renderButtons() {
    let user = this.props.usersCache[this.props.userId];
    let friendString;
    let friendshipStatus = user ? user.friendship_status_with_client : null;
    let deactivateButton = friendshipStatus === FRIEND_TYPES.SENT || friendshipStatus === FRIEND_TYPES.ACCEPTED;
    let isBlocked = user ? user.is_user_blocked_by_client : false;

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
          {!isBlocked ?
            <RN.TouchableOpacity
            style={[styles.friendButtonBackground, deactivateButton && styles.buttonBackgroundDisabled]}
            onPress={this._onPressFriend}
            >
            <Icon name={iconName} style={[styles.friendIcon, deactivateButton && styles.buttonTextDisabled]} />
            <RN.Text style={[UTILITY_STYLES.lightWhiteText15, deactivateButton && styles.buttonTextDisabled]}>
              {friendString}
            </RN.Text>
          </RN.TouchableOpacity> :
          null }
          <RN.TouchableOpacity
            style={[styles.buttonBackground, styles.buttonBackgroundDisabled]}
            onPress={this._onPressBlock}
            >
            <RN.Text style={[UTILITY_STYLES.lightBlackText15, isBlocked && styles.buttonTextDisabled]}>
              { isBlocked ? 'Unblock' : 'Block' }
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={{height: 30}} />
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
          <RN.TouchableOpacity style={styles.avatarView} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.client.id != this.props.userId}>
            <AvatarContainer userId={this.props.userId} avatarSize={70} iconSize={32} frameBorderWidth={2} />
            {this._renderChangeText()}
          </RN.TouchableOpacity>
          {this._renderUsername()}
        </RN.View>
        {this._renderButtons()}
        <TabBarContainer userId={this.props.userId} isClient={this.props.isClient} />
      </RN.Animated.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileHeader;
