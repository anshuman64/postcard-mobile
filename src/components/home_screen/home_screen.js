// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListContainer      from '../post_list/post_list_container.js';
import { POST_TYPES }         from '../../actions/post_actions.js';
import { styles }             from './home_screen_styles.js';
import { defaultErrorAlert }  from '../../utilities/error_utility.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
      .catch((error) => defaultErrorAlert(error))
  }

  // Debug Test
  // componentWillReceiveProps (nextProps) {
  //   if (this.props.currentScreen != '_HomeScreen' && nextProps.currentScreen === '_HomeScreen') {
  //     let currentTime = new Date();
  //     let lastUpdate = this.props.allPosts.lastUpdated;
  //     let minsDiff = (currentTime - lastUpdate) / (1000 * 60);
  //
  //     if (minsDiff > 1) {
  //       this.postList.getWrappedInstance()._onRefresh();
  //     }
  //   }
  // }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer ref={(ref) => this.postList = ref} posts={this.props.allPosts} postType={POST_TYPES.ALL} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
