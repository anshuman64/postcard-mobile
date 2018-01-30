// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles, PROFILE_HEADER_HEIGHT, PROFILE_HEADER_TABS_HEIGHT } from './profile_header_styles.js';
import { POST_TYPES }                                                from '../../actions/post_actions.js';
import { getFile }                                                  from '../../utilities/file_utility.js';
import { UTILITY_STYLES }                                            from '../../utilities/style_utility.js';
import { defaultErrorAlert }                                         from '../../utilities/error_utility.js';

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

    this.isFollowDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // If user has avatar, get image from AWS S3 and set signed url
  componentDidMount() {
    if (this.props.avatarUrl) {
      this._setAvatarUrl(this.props.avatarUrl);
    }
  }

  // If user changed avatars, update avatar
  componentWillReceiveProps(nextProps) {
    if (this.props.user.id === this.props.userId && nextProps.user.avatar_url != this.props.user.avatar_url) {
      this._setAvatarUrl(nextProps.user.avatar_url);
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  // Get image from AWS S3 and set url as signed Url
  _setAvatarUrl(avatarUrl) {
    getFile(this.props.firebaseUserObj, this.props.refreshAuthToken, avatarUrl)
      .then((data) => {
        this.setState({ avatarUrl: data });
      })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Creates or deletes follow from DB
  _onPressFollow = () => {
    if (this.isFollowDisabled) {
      return;
    }

    this.isFollowDisabled = true;

    if (this.props.isFollowed) {
      this._onPressUnfollow();
    } else {
      this.props.createFollow(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.userId)
        .then(() => {
          this.props.setFollowState({ isFollowed: true });
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
    this.props.deleteFollow(this.props.authToken, this.props.firebaseUserObj, this.props.user.id, this.props.userId)
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

  _renderAvatar() {
    if (this.props.currentScreen === 'HomeScreen') {
      return null;
    } else if ((this.props.user.id === this.props.userId && !this.props.user.avatar_url)
               || (this.props.user.id != this.props.userId && !this.props.avatarUrl)) {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.user.id != this.props.userId}>
          <RN.View style={styles.frameBorder}>
            <Icon name='user' style={styles.userIcon} />
          </RN.View>
          <Icon name='pencil' style={[styles.avatarPencil, this.props.user.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    } else if (!this.state.avatarUrl) {
      return (
        <RN.View style={styles.frame} />
      )
    } else {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.user.id != this.props.userId}>
          <RN.Image source={{uri: this.props.images[this.props.user.avatar_url]}} style={styles.image} resizeMode={'cover'} />
          <Icon name='pencil' style={[styles.avatarPencil, this.props.user.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderUsername() {
    if (this.props.currentScreen === 'HomeScreen') {
      return null;
    } else {
      return (
        <RN.TouchableOpacity style={styles.usernameButton} onPress={() => this.props.navigateTo('UsernameScreen')} disabled={this.props.user.id != this.props.userId}>
          <RN.Text style={styles.usernameText}>
            {this.props.username}
          </RN.Text>
          <Icon name='pencil' style={[styles.pencil, this.props.user.id != this.props.userId && UTILITY_STYLES.transparentText]} />
        </RN.TouchableOpacity>
      )
    }
  }

  _renderFollowButton() {
    if (this.props.user.id != this.props.userId) {
      return (
        <RN.TouchableOpacity
          style={[styles.followButtonBackground, this.props.isFollowed && styles.followButtonBackgroundDisabled]}
          onPress={this._onPressFollow}
          >
          <RN.Text style={[UTILITY_STYLES.lightWhiteText16, this.props.isFollowed && styles.followButtonTextDisabled]}>
            { this.props.isFollowed ? 'Following' : 'Follow' }
          </RN.Text>
        </RN.TouchableOpacity>
      )
    } else {
      return (
        <RN.View style={{ height: 30 }} />
      )
    }
  }

  _renderTabs() {
    if (this.props.currentScreen === 'HomeScreen') {
      return (
        <RN.View style={styles.tabs}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.ALL })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, {marginBottom: 5}, this.props.postType === POST_TYPES.ALL && UTILITY_STYLES.textHighlighted]} >
              Recent
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.FOLLOWED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, {marginBottom: 5}, this.props.postType === POST_TYPES.FOLLOWED && UTILITY_STYLES.textHighlighted]} >
              Following
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.tabs}>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.AUTHORED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, {marginBottom: 5}, this.props.postType === POST_TYPES.AUTHORED && UTILITY_STYLES.textHighlighted]} >
              Posts
            </RN.Text>
          </RN.TouchableOpacity>
          <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.LIKED })} style={styles.button}>
            <RN.Text style={[UTILITY_STYLES.lightBlackText16, {marginBottom: 5}, this.props.postType === POST_TYPES.LIKED && UTILITY_STYLES.textHighlighted]} >
              Liked
            </RN.Text>
          </RN.TouchableOpacity>
        </RN.View>
      )
    }
  }

  render() {
    const translateY = this.props.scrollY.interpolate({
      inputRange: [0, (PROFILE_HEADER_HEIGHT - PROFILE_HEADER_TABS_HEIGHT)],
      outputRange: [0, -(PROFILE_HEADER_HEIGHT - PROFILE_HEADER_TABS_HEIGHT)],
      extrapolate: 'clamp',
    });

    return (
      <RN.Animated.View style={[styles.container,
        this.props.currentScreen === 'HomeScreen' && { height: PROFILE_HEADER_TABS_HEIGHT },
        this.props.currentScreen != 'HomeScreen' && { transform: [{translateY}] }]}
        >
        <RN.View style={styles.userView}>
          {this._renderAvatar()}
          <RN.View style={styles.usernameView}>
            {this._renderUsername()}
            {this._renderFollowButton()}
          </RN.View>
        </RN.View>
        {this._renderTabs()}
      </RN.Animated.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileHeader;
