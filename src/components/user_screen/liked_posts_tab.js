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
    this.props.getLikedPosts(this.props.authToken)
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.likedPosts.data, nextProps.likedPosts.data)) {
      let postsArray = [];
      _.forEach(nextProps.likedPosts.data, (id) => {
        postsArray.push(nextProps.postsCache[id])
      })

      this.state.likedPostsData = postsArray;
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.likedPostsData} authToken={this.props.authToken} getPosts={this.props.getLikedPosts} isNew={this.props.likedPosts.isNew} isEnd={this.props.likedPosts.isEnd}/>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default LikedPostsTab;
