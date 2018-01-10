// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './profile_screen_styles.js';

//--------------------------------------------------------------------//


class ProfileScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      postType: POST_TYPES.AUTHORED,
    };
  }

  componentDidMount() {
    this.postList.getWrappedInstance()._onRefresh();
    this.postList.getWrappedInstance()._onRefresh(POST_TYPES.LIKED);
  }

  componentWillReceiveProps(nextProps) {
    // Auto-refresh screen if coming back to it after > 1 minute
    if (this.props.currentScreen != '_ProfileScreen' && nextProps.currentScreen === '_ProfileScreen') {
      let currentTime = new Date();
      let lastUpdate = this.props.posts[this.props.user.id][this.state.postType].lastUpdated;
      let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

      if (minsDiff > 1) {
        this.postList.getWrappedInstance()._onRefresh();
      }
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  setParentState = (state) => {
    return () => (this.setState(state));
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.user.id} postType={this.state.postType} setParentState={this.setParentState} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
