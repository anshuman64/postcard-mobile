// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }     from './user_header_styles.js';
import { POST_TYPES } from '../../actions/post_actions.js';
import { getImage }   from '../../utilities/file_utility.js';

//--------------------------------------------------------------------//

class UserHeader extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      avatarUrl: null,
    }
  }

  componentDidMount() {
    if (this.props.avatarUrl) {
      getImage(this.props.firebaseUserObj, this.props.refreshAuthToken, this.props.avatarUrl)
        .then((data) => {
          this.setState({ avatarUrl: data });
        })
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAvatar() {
      return (
        <RN.View style={styles.frame}>
          {!this.state.avatarUrl ?
            <Icon name='user' style={styles.placeholderImage} /> :
            <RN.Image source={{uri: this.state.avatarUrl}} style={styles.image} resizeMode={'contain'} />
          }
        </RN.View>
      )
  }

  _renderUsername() {
    return (
      <RN.View style={styles.usernameButton}>
        <RN.Text style={styles.usernameText}>
          {this.props.username}
        </RN.Text>
      </RN.View>
    )
  }

  _renderTabs() {
    return (
      <RN.View style={styles.tabs}>
        <RN.TouchableOpacity onPress={this.props.setParentState ? this.props.setParentState({ postType: POST_TYPES.AUTHORED }) : null} style={styles.button}>
          <RN.Text style={[styles.text, this.props.postType === POST_TYPES.AUTHORED && styles.textHighlighted]} >
            Posts
          </RN.Text>
        </RN.TouchableOpacity>
        <RN.TouchableOpacity onPress={this.props.setParentState ? this.props.setParentState({ postType: POST_TYPES.LIKED }) : null} style={styles.button}>
          <RN.Text style={[styles.text, this.props.postType === POST_TYPES.LIKED && styles.textHighlighted]} >
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

export default UserHeader;
