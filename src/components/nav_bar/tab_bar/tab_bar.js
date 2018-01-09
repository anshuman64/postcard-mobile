// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }   from './tab_bar_styles.js';
import { getImage } from '../../../utilities/file_utility.js';

//--------------------------------------------------------------------//

class TabBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.avatar_url && nextProps.user.avatar_url != this.state.avatarUrl) {
      getImage(nextProps.firebaseUserObj, nextProps.refreshAuthToken, nextProps.user.avatar_url)
        .then((data) => {
          this.setState({ avatarUrl: data });
        })
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
    if (!this.state.avatarUrl) {
      return (
        <RN.View style={styles.frame}>
          <Icon name='user' style={styles.placeholderImage} />
        </RN.View>
      )
    } else {
      return (
        <RN.View style={styles.frame}>
          <RN.Image source={{uri: this.state.avatarUrl}} style={styles.image} resizeMode={'contain'} />
        </RN.View>
      )
    }
  }

  _renderUsername() {
    return (
      <RN.TouchableOpacity style={styles.usernameButton} onPress={() => this.props.navigateTo('UsernameScreen')}>
        <RN.Text style={[styles.usernameText]}>
          {'@' + this.props.user.username}
        </RN.Text>
        <Icon name='pencil' style={styles.pencil} />
      </RN.TouchableOpacity>
    )
  }

  _renderTabs() {
    return (
      <RN.View style={styles.tabs}>
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('AuthoredPostsTab')} style={styles.button}>
          <RN.Text style={[styles.text, this.props.currentScreen === '_AuthoredPostsTab' && styles.textHighlighted]} >
            Posts
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity onPress={() => this.props.navigateTo('LikedPostsTab')} style={styles.button}>
          <RN.Text style={[styles.text, this.props.currentScreen === '_LikedPostsTab' && styles.textHighlighted]} >
            Liked
          </RN.Text>
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderAvatar()}
        {this._renderUsername()}
        {this._renderTabs()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default TabBar;
