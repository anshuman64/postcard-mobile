// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListContainer     from '../post_list/post_list_container.js';
import { POST_TYPES }        from '../../actions/post_actions.js';
import { setStateCallback }  from '../../utilities/function_utility.js';
import { styles }            from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <RN.View style={styles.header}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.settingsIcon.setNativeProps({style: styles.iconHighlighted})}
          onPressOut={() => this.settingsIcon.setNativeProps({style: styles.settingsIcon})}
          onPress={() => navigation.dispatch(toMenuScreen())}
          >
          <Icon ref={(ref) => this.settingsIcon = ref} name='settings' style={styles.settingsIcon} />
        </RN.TouchableWithoutFeedback>
        <RN.Image
          style={styles.logo}
          source={require('../../assets/images/logo/logo.png')}
          resizeMode='contain'
          />
        <RN.TouchableOpacity onPress={() => navigation.dispatch(toNewPostScreen())} >
          <Icon name='note' style={styles.noteIcon} />
        </RN.TouchableOpacity>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={styles.container} >
        {this._renderHeader()}
        <PostListContainer posts={this.props.allPosts} postType={POST_TYPES.ALL} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
