// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer     from '../post_list/post_list_container.js';
import { POST_TYPES }        from '../../actions/post_actions.js';
import { setStateCallback }  from '../../utilities/function_utility.js';
import { styles }            from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
  }

  componentWillUpdate() {
    if (this.props.isHomeScreenFocused) {
      let currentTime = new Date();
      let lastUpdate = this.props.allPosts.lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 5)
      console.log('hey')

      if (minsDiff > 1) {
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
