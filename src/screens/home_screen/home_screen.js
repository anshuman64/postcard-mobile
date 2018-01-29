// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/nav_bar_header/header_container.js';
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class HomeScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      postType:  POST_TYPES.ALL,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh AllPosts and FollowedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
    this.postList.getWrappedInstance().refresh(POST_TYPES.FOLLOWED);
  }

  // Auto-refresh screen if coming back to it after > 1 minute
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'HomeScreen' && nextProps.currentScreen === 'HomeScreen') {
      let checkRefresh = (postType) => {
        let currentTime = new Date();
        let lastUpdate = this.props.posts[this.props.user.id][postType].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 1) {
          this.postList.getWrappedInstance().refresh(postType);
        }
      }

      checkRefresh(POST_TYPES.ALL);
      checkRefresh(POST_TYPES.FOLLOWED);
    }
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to ProfileHeader for tab switching
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
      <RN.View style={UTILITY_STYLES.containerCenter}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          userId={this.props.user.id}
          postType={this.state.postType}
          scrollToTop={this.props.scrollToTop}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
