// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer    from '../../components/header/header_container.js';
import PostListContainer  from '../../components/post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Refresh ReceivedPosts on mount
  componentDidMount() {
    this.postList.getWrappedInstance().refresh(POST_TYPES.RECEIVED);
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
