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
    this.props.getAllPosts(this.props.authToken, {limit: 5})
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.allPostsData.length != 0 ) {
      // If loading more posts, first id of allPosts should be less than last id of allPostsData
      // If that's not the case, must be refreshing so reset allPostsData
      if (!(nextProps.allPosts.data[0] < this.state.allPostsData[this.state.allPostsData.length-1].id)) {
        this.state.allPostsData = [];
      }
    }

    _.forEach(nextProps.allPosts.data, (id) => {
      this.state.allPostsData.push(nextProps.postsCache[id])
    })
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

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
