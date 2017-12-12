// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostList     from '../post_list/post_list.js';
import samplePosts  from '../../test_data/sample_posts.js';


//--------------------------------------------------------------------//


class HomeScreen extends React.Component {

  componentDidMount() {
    this.props.getAllPosts(this.props.authToken);
    // debugger;
  }

  // _renderHeader() {
  //   return (
  //     // <RN.Image
  //     //   style={styles.headerTitle}
  //     //   source={require('../assets/images/login_screen_logo/Logo_ExactFit_807x285.png')}
  //     //   resizeMode='contain'
  //     // />,
  //     // <Icon name='options-vertical' onPress={() => navigation.dispatch(toMenuScreen())} style={styles.optionsIcon} />,
  //     // <Icon name='note' onPress={() => navigation.dispatch(toNewPostScreen())} style={styles.noteIcon} />,
  //   )
  // }

  render() {
    return (
      <PostList data={samplePosts} />
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
