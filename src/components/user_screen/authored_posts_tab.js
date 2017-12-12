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

  componentDidMount() {
    this.props.getAuthoredPosts(this.props.authToken, { limit: 3, offset: this.state.authoredPostsData.length })
      .then(() => {
        _.forEach(this.props.authoredPosts, (id) => {
          this.state.authoredPostsData.push(this.props.postsCache[id])
        })
      })
  }

  render() {
    return (
      <RN.View style={styles.container} >
        <PostList data={this.state.authoredPostsData} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
