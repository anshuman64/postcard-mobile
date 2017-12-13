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
    if (!this.props.allPosts.lastUpdated) {
      this.props.getAllPosts(this.props.authToken, true, {limit: 5})
      return;
    }

    let minsDiff = (Date() - this.props.allPosts.lastUpdated) / (1000 * 60)
    if (minsDiff > 1) {
      this.props.getAllPosts(this.props.authToken, true, {limit: 5})
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.allPosts.data, nextProps.allPosts.data)) {
      let postsArray = [];
      _.forEach(nextProps.allPosts.data, (id) => {
        postsArray.push(nextProps.postsCache[id])
      })

      this.state.allPostsData = postsArray;
    }
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.allPostsData} authToken={this.props.authToken} getPosts={this.props.getAllPosts} isNew={this.props.allPosts.isNew} isEnd={this.props.allPosts.isEnd}/>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
