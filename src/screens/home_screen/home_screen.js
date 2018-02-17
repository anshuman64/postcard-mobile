// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/header/header_container';
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.currentAppState = 'active';
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh ReceivedPosts on mount
  componentDidMount() {
    RN.AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    RN.AppState.removeEventListener('change', this._handleAppStateChange);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // When refocusing app, refresh received posts
  _handleAppStateChange = (nextAppState) => {
    if (this.currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      this.postList.getWrappedInstance()._onRefresh(POST_TYPES.RECEIVED);
    }

    this.currentAppState = nextAppState;
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          screen={'HomeScreen'}
          userId={this.props.client.id}
          postType={POST_TYPES.RECEIVED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
