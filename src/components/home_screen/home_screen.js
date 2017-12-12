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
    this.props.getAllPosts(this.props.authToken, { limit: 10, offset: this.state.allPostsData.length })
      .then(() => {
        _.forEach(this.props.allPosts, (id) => {
          this.state.allPostsData.push(this.props.postsCache[id])
        })
      })
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
