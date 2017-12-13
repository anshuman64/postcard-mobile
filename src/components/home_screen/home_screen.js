// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';
import { styles }   from './home_screen_styles.js';


//--------------------------------------------------------------------//


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPostsData: [],
    };
  }

  componentDidMount() {
    this.getPostData(null, 1);
  }

  getPostData(startAt, limit) {
    let queryParams = {};

    if (startAt) {
      _.merge(queryParams, { start_at: startAt })
    }

    if (limit) {
      _.merge(queryParams, { limit: limit })
    }

    if (queryParams != {}) {
      this.props.getAllPosts(this.props.authToken, queryParams)
    } else {
      this.props.getAllPosts(this.props.authToken)
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.allPosts.data.length === 0) {
      return;
    }

    if (this.state.allPostsData.length === 0) {
      _.forEach(nextProps.allPosts.data, (id) => {
        this.state.allPostsData.push(nextProps.postsCache[id])
      })

      return;
    }

    // If refreshing, first id of allPosts should be greater than first id of allPostsData
    if (nextProps.allPosts.data[0] > this.state.allPostsData[0].id) {
      // Add elements to start of allPostsData until known post is reached
      for (i = nextProps.allPosts.data.length-1; i >= 0; i--) {
        if (nextProps.allPosts.data[i] > this.state.allPostsData[0].id) {
          this.state.allPostsData.unshift(nextProps.postsCache[nextProps.allPosts.data[i]])
        }
      }

      return;
    }

    // If loading more posts, last id of allPosts should be less than last id of allPostsData
    if (nextProps.allPosts.data[nextProps.allPosts.data.length] < this.state.allPostsData[this.state.allPostsData.length].id) {
      // Add elements to
      _.forEach(nextProps.allPosts.data, (id) => {
        this.state.allPostsData.push(nextProps.postsCache[id])
      })

      return;
    }
  }

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.allPostsData} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
