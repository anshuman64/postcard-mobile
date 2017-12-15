// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import PostListContainer  from '../post_list/post_list_container.js';
import { POST_TYPES }     from '../../actions/post_actions.js';
import { styles }         from '../home_screen/home_screen_styles.js';


//--------------------------------------------------------------------//

class AuthoredPostsTab extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  componentDidMount() {
    this._refreshPosts();
    this._startTimer();
  }

  componentWillUnmount() {
    this._stopTimer();
  }

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _refreshPosts() {
    this.props.refreshPosts(this.props.authToken, POST_TYPES.AUTHORED);
  }

  _startTimer() {
    this.timer = setInterval(this._tick.bind(this), 1000 * 60);
  }

  _stopTimer() {
    clearInterval(this.timer);
  }

  _tick() {
    this._stopTimer();
    this._refreshPosts();
    this._startTimer();
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return (
      <RN.View style={styles.container} >
        <PostListContainer posts={this.props.authoredPosts} postType={POST_TYPES.AUTHORED} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default AuthoredPostsTab;
