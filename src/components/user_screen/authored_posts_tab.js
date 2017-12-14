// Library Imports
import React  from 'react';
import RN     from 'react-native';
import * as _ from 'lodash';

// Local Imports
import { styles }   from '../home_screen/home_screen_styles.js';
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authoredPostsData: [],
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.getAuthoredPosts(this.props.authToken, {limit: 1})
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.authoredPosts.data, nextProps.authoredPosts.data)) {
      let postsArray = [];
      _.forEach(nextProps.authoredPosts.data, (id) => {
        postsArray.push(nextProps.postsCache[id])
      })

      this.state.authoredPostsData = postsArray;
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.authoredPostsData} authToken={this.props.authToken} getPosts={this.props.getAuthoredPosts} isNew={this.props.authoredPosts.isNew} isEnd={this.props.authoredPosts.isEnd}/>
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
