// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import HeaderContainer    from '../header/header_container.js';
import PostListContainer  from '../post_list/post_list_container.js';
import { styles }         from '../home_screen/home_screen_styles.js';
import { POST_TYPES }     from '../../actions/post_actions.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.PureComponent {
  static navigationOptions = ({navigation}) => ({
    header: <HeaderContainer navigation={navigation} settingsIcon={true} logo={true} noteIcon={true} noBorder={true} />
  })

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED)
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
