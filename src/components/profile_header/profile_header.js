// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }     from './profile_header_styles.js';
import { POST_TYPES } from '../../actions/post_actions.js';
import { getImage }   from '../../utilities/file_utility.js';

//--------------------------------------------------------------------//

class ProfileHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: null,
    }
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    if (this.props.avatarUrl) {
      this._setAvatarUrl(this.props.avatarUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.id === this.props.userId && nextProps.user.avatar_url != this.props.user.avatar_url) {
      this._setAvatarUrl(nextProps.user.avatar_url);
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setAvatarUrl(avatarUrl) {
    getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, avatarUrl)
      .then((data) => {
        this.setState({ avatarUrl: data });
      })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
      return (
        <RN.TouchableOpacity style={styles.frame} onPress={() => this.props.navigateTo('AvatarScreen')} disabled={this.props.user.id != this.props.userId}>
          {!this.state.avatarUrl ?
            <Icon name='user' style={styles.userIcon} /> :
            <RN.Image source={{uri: this.state.avatarUrl}} style={styles.image} resizeMode={'contain'} />
          }
        </RN.TouchableOpacity>
      )
  }

  _renderUsername() {
    return (
      <RN.TouchableOpacity style={styles.usernameButton} onPress={() => this.props.navigateTo('UsernameScreen')} disabled={this.props.user.id != this.props.userId}>
        <RN.Text style={[styles.usernameText]}>
          {this.props.username}
        </RN.Text>
        {this.props.user.id === this.props.userId ?
          <Icon name='pencil' style={styles.pencil} /> :
          null
        }
      </RN.TouchableOpacity>
    )
  }

  _renderTabs() {
    return (
      <RN.View style={styles.tabs}>
        <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.AUTHORED })} style={styles.button}>
          <RN.Text style={[styles.text, this.props.postType === POST_TYPES.AUTHORED && styles.textHighlighted]} >
            Posts
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity onPress={this.props.setParentState({ postType: POST_TYPES.LIKED })} style={styles.button}>
          <RN.Text style={[styles.text, this.props.postType === POST_TYPES.LIKED && styles.textHighlighted]} >
            Liked
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  render() {
    const translateY = this.props.scrollY.interpolate({
      inputRange: [0, 240],
      outputRange: [0, -240],
      extrapolate: 'clamp',
    });

    return (
      <RN.Animated.View style={[styles.container, this.props.currentScreen === 'HomeScreen' && {height: 0}, this.props.currentScreen != 'HomeScreen' && { transform: [{translateY}] }]}>
        {this._renderAvatar()}
        {this._renderUsername()}
        {this._renderTabs()}
      </RN.Animated.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileHeader;
