// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import Header             from '../header/header.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { styles }         from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {
  static navigationOptions = {
    header: null,
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.ALL)
  }


  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <Header navigation={this.props.navigation} settingsIcon={true} logo={true} noteIcon={true} />
        <PostListContainer posts={this.props.allPosts} postType={POST_TYPES.ALL} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default HomeScreen;
