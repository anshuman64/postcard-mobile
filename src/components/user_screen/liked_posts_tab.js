// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import { styles }   from '../home_screen/home_screen_styles.js';
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//

class LikedPostsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      likedPostsData: [],
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.getLikedPosts(this.props.authToken, { limit: 3, offset: this.state.likedPostsData.length })
      .then(() => {
        _.forEach(this.props.likedPosts, (id) => {
          this.state.likedPostsData.push(this.props.postsCache[id])
        })
      })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.likedPostsData} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LikedPostsTab;
