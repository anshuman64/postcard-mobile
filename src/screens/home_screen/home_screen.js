// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import PostListContainer  from '../../components/post_list/post_list_container';
import { POST_TYPES }     from '../../actions/post_actions';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class HomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <PostListContainer
          ref={(ref) => this.postList = ref}
          userId={this.props.client.id}
          postType={POST_TYPES.RECEIVED}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default HomeScreen;
