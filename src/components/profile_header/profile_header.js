// Library Imports
import React           from 'react';
import RN              from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import TabBar                            from '../tab_bar/tab_bar.js';
import { TAB_BAR_HEIGHT }                from '../tab_bar/tab_bar_styles.js';
import { styles, PROFILE_HEADER_HEIGHT } from './profile_header_styles.js';
import { POST_TYPES }                    from '../../actions/post_actions.js';
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

    if (this.props.friendStatus) {

    } else {

    }
  }

  _onPressUnfriend = () => {
    RN.Alert.alert(
      '',
      'Are you sure you want to remove this friend?',
      [
        {text: 'Cancel', onPress: () => this.isFriendDisabled = false, style: 'cancel'},
        {text: 'Remove', onPress: this._onConfirmUnfriend},
      ],
      {
        onDismiss: () => this.isFriendDisabled = false
      }
    )
  }

  _onConfirmUnfriend = () => {

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
      this.props.createFollow(this.props.authToken, this.props.firebaseUserObj, this.props.userId)
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
    this.props.deleteFollow(this.props.authToken, this.props.firebaseUserObj, this.props.userId)
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
    let avatarUrl;

    if (this.props.userId === this.props.client.id) {
      avatarUrl = this.props.client.avatar_url;
    } else if (this.props.usersCache[this.props.userId].avatar_url) {
      avatarUrl = this.props.usersCache[this.props.userId].avatar_url;
    }

    if (!avatarUrl) {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.client.id != this.props.userId}>
          <RN.View style={styles.frameBorder}>
            <Icon name='user' style={styles.userIcon} />
          </RN.View>
          <Icon name='pencil' style={[styles.avatarPencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    } else if (avatarUrl && !this.props.images[avatarUrl]) {
      return (
        <RN.View style={styles.frame} />
      )
    } else {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.client.id != this.props.userId}>
          <CachedImage
            source={{uri: this.props.images[avatarUrl].url}}
            style={styles.image}
            resizeMode={'cover'}
            onError={() => this.props.refreshCredsAndGetImage(this.props.firebaseUserObj, avatarUrl)}
            />
          <Icon name='pencil' style={[styles.avatarPencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderUsername() {
    return (
      <RN.TouchableOpacity style={styles.usernameButton} onPress={() => this.props.navigateTo('UsernameScreen')} disabled={this.props.client.id != this.props.userId}>
        <RN.Text style={styles.usernameText}>
          {this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].username : null}
        </RN.Text>
        <Icon name='pencil' style={[styles.pencil, this.props.client.id != this.props.userId && UTILITY_STYLES.transparentText]} />
      </RN.TouchableOpacity>
    )
  }

  _renderButtons() {
    let friendString;

    if (this.props.friendStatus === 'REQUESTED') {
      friendString = 'Cancel Request';
    } else if (this.props.friendStatus === 'ACCEPTED') {
      friendString = 'Friends'
    } else {
      friendString = 'Add Friend';
    }

    if (this.props.client.id != this.props.userId) {
      return (
        <RN.View style={styles.buttonView}>
          <RN.TouchableOpacity
            style={[styles.friendButtonBackground, this.props.friendStatus && styles.buttonBackgroundDisabled]}
            onPress={this._onPressFriend}
            >
            <RN.Text style={[UTILITY_STYLES.lightWhiteText15, this.props.friendStatus && styles.buttonTextDisabled]}>
              {friendString}
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity
            style={[styles.followButtonBackground, this.props.usersCache[this.props.userId].is_user_followed_by_client && styles.buttonBackgroundDisabled]}
            onPress={this._onPressFollow}
            >
            <RN.Text style={[UTILITY_STYLES.lightWhiteText15, UTILITY_STYLES.textHighlighted, this.props.usersCache[this.props.userId].is_user_followed_by_client && styles.buttonTextDisabled]}>
              { this.props.usersCache[this.props.userId].is_user_followed_by_client ? 'Following' : 'Follow' }
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
