// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './home_screen_styles.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  componentDidMount() {
    this.postList.getWrappedInstance()._onRefresh();
  }

  componentWillReceiveProps(nextProps) {
    // Auto-refresh screen if coming back to it after > 1 minute
    if (this.props.currentScreen != '_HomeScreen' && nextProps.currentScreen === '_HomeScreen') {
      let currentTime = new Date();
      let lastUpdate = this.props.posts[0][POST_TYPES.ALL].lastUpdated;
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
        <PostListContainer ref={(ref) => this.postList = ref} userId={0} postType={POST_TYPES.ALL} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
