// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/nav_bar_header/header_container.js';
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class ProfileScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      postType:  POST_TYPES.AUTHORED,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);
  }

  componentWillReceiveProps(nextProps) {
    // Auto-refresh screen if coming back to it after > 1 minute
    if (this.props.currentScreen != 'ProfileScreen' && nextProps.currentScreen === 'ProfileScreen') {
      let checkRefresh = (postType) => {
        let currentTime = new Date();
        let lastUpdate = this.props.posts[this.props.user.id][postType].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 1) {
          this.postList.getWrappedInstance()._onRefresh(postType);
        }
      }

      checkRefresh(POST_TYPES.AUTHORED);
      checkRefresh(POST_TYPES.LIKED);
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  setParentState = (state) => {
    let func = () => {
      this.setState(state);
    }

    return func;
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.user.id} username={this.props.user.username} avatarUrl={this.props.user.avatar_url} postType={this.state.postType} scrollToTop={this.props.scrollToTop} setParentState={this.setParentState} />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ProfileScreen;
