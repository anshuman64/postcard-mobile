// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer   from '../../components/nav_bar_header/header_container.js';
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
  }

  componentWillReceiveProps(nextProps) {
    // Auto-refresh screen if coming back to it after > 1 minute
    if (this.props.currentScreen != 'HomeScreen' && nextProps.currentScreen === 'HomeScreen') {
      let currentTime = new Date();
      let lastUpdate = this.props.posts[this.props.user.id][POST_TYPES.ALL].lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this.postList.getWrappedInstance()._onRefresh();
      }
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.user.id} postType={POST_TYPES.ALL} scrollToTop={this.props.scrollToTop} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
