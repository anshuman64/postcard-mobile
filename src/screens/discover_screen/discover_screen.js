// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import TabBar             from '../../components/tab_bar/tab_bar.js';
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class DiscoverScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      postType:  POST_TYPES.PUBLIC,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Auto-refresh screen if coming back to it after > 1 minute
  componentWillReceiveProps(nextProps) {
    if (this.props.currentScreen != 'DiscoverScreen' && nextProps.currentScreen === 'DiscoverScreen') {
      let checkRefresh = (postType) => {
        let currentTime = new Date();
        let lastUpdate = this.props.posts[this.props.client.id][postType].lastUpdated;
        let minsDiff = (currentTime - lastUpdate) / (1000 * 60);

        if (minsDiff > 1) {
          this.postList.getWrappedInstance().refresh(postType);
        }
      }

      checkRefresh(POST_TYPES.PUBLIC);
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
      <RN.View style={UTILITY_STYLES.containerStart}>
        <TabBar screen={'DiscoverScreen'} postType={this.state.postType} setParentState={this.setParentState} />
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'DiscoverScreen'}
          userId={this.props.client.id}
          postType={this.state.postType}
          setParentState={this.setParentState}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default DiscoverScreen;
