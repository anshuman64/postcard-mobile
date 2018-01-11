// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './user_screen_styles.js';

//--------------------------------------------------------------------//


class UserScreen extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      postType: POST_TYPES.AUTHORED,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
    this.postList.getWrappedInstance().refresh(POST_TYPES.LIKED);
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  setParentState = (state) => {
    this.setState(state)
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.userId} username={this.props.username} avatarUrl={this.props.avatarUrl} postType={this.state.postType} setParentState={this.setParentState}/>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserScreen;
