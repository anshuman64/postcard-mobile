// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import PostList              from '../post_list/post_list.js';
import samplePosts           from '../../test_data/sample_posts.js';
import { styles }            from './home_screen_styles.js';
import { setStateCallback }  from '../../utilities/component_utility.js';


//--------------------------------------------------------------------//


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allPostsData: [],
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this._getPostData(true, null, 1);
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

    // If there was no change in postData, return
    if (_.isEqual(this.props.allPosts.data, nextProps.allPosts.data)) {
      return;
    }

    // If loading more posts, last id of allPosts should be less than last id of allPostsData
    if (nextProps.allPosts.data[nextProps.allPosts.data.length] < this.state.allPostsData[this.state.allPostsData.length].id) {
      _.forEach(nextProps.allPosts.data, (id) => {
        this.state.allPostsData.push(nextProps.postsCache[id])
      })

      return;
    }

    // If refreshing, first id of allPosts should be greater than first id of allPostsData
    if (!_.isEqual(this.props.allPosts.data, nextProps.allPosts.data)) {
      // Add elements to start of allPostsData until known post is reached
      for (i = nextProps.allPosts.data.length-1; i >= 0; i--) {
        if (nextProps.allPosts.data[i] > this.state.allPostsData[0].id) {
          this.state.allPostsData.unshift(nextProps.postsCache[nextProps.allPosts.data[i]])
        }
      }

      return;
    }
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _getPostData(isRefresh, startAt, limit) {
    let queryParams = {};

    if (startAt) {
      _.merge(queryParams, { start_at: startAt })
    }

    if (limit) {
      _.merge(queryParams, { limit: limit })
    }

    if (queryParams != {}) {
      this.props.getAllPosts(this.props.authToken, isRefresh, queryParams)
    } else {
      this.props.getAllPosts(this.props.authToken, isRefresh)
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.allPostsData} isRefreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
