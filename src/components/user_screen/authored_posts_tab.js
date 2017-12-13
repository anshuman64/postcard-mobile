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
    if (this.state.authoredPostsData.length != 0 ) {
      if (!(nextProps.authoredPosts.data[0] < this.state.authoredPostsData[this.state.authoredPostsData.length-1].id)) {
        this.state.authoredPostsData = [];
      }
    }

    _.forEach(nextProps.authoredPosts.data, (id) => {
      this.state.authoredPostsData.push(nextProps.postsCache[id])
    })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

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
