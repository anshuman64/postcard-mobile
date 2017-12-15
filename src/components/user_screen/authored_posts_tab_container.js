// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AuthoredPostsTab  from './authored_posts_tab.js';
import { refreshPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts }, ownProps) => ({
  authToken:     user.authToken,
  authoredPosts: posts.authoredPosts
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPosts: (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthoredPostsTab);
