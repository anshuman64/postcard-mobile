// Library Imports
import React     from 'react';
import RN        from 'react-native';

// Local Imports
import HeaderContainer   from '../../components/nav_bar_header/header_container.js';
import PostListContainer from '../../components/post_list/post_list_container.js';
import { POST_TYPES }    from '../../actions/post_actions.js';
import { styles }        from './user_screen_styles.js';

//--------------------------------------------------------------------//


class UserScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this.postList.getWrappedInstance().refresh();
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container}>
        <HeaderContainer backIcon={true} backTitle={this.props.username + "'s Profile"} />
        <PostListContainer ref={(ref) => this.postList = ref} userId={this.props.userId} username={this.props.username} avatarUrl={this.props.avatarUrl} postType={this.props.name === '_UserScreenAuthored' ? POST_TYPES.AUTHORED : POST_TYPES.LIKED} setParentState={this.setParentState}/>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default UserScreen;
