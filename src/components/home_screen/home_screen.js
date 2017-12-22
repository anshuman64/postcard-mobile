// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import HeaderContainer    from '../header/header_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { styles }         from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.currentScreen === '_HomeScreen') {
      let currentTime = new Date();
      let lastUpdate = this.props.allPosts.lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

      if (minsDiff > 0.1) {
        this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
      }
    }
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer posts={this.props.allPosts} postType={POST_TYPES.ALL} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
