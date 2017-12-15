// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer     from '../post_list/post_list_container.js';
import { POST_TYPES }        from '../../actions/post_actions.js';
import { setStateCallback }  from '../../utilities/component_utility.js';
import { styles }            from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // TODO: fix lastUpdated to work with react navigation
  componentDidMount() {
    if (!this.props.allPosts.lastUpdated) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL, {limit: 5})
      return;
    }

    let minsDiff = (Date() - this.props.allPosts.lastUpdated) / (1000 * 60)
    if (minsDiff > 1) {
      this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL, {limit: 5})
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
