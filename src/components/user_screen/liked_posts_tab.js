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
    if (this.state.likedPostsData.length != 0 ) {
      if (!(nextProps.likedPosts.data[0] < this.state.likedPostsData[this.state.likedPostsData.length-1].id)) {
        this.state.likedPostsData = [];
      }
    }

    _.forEach(nextProps.likedPosts.data, (id) => {
      this.state.likedPostsData.push(nextProps.postsCache[id])
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
