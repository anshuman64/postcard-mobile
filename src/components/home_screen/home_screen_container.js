// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen           from './home_screen.js';
import { refreshPosts }     from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, nav }, ownProps) => ({
  authToken:    user.authToken,
  allPosts:     posts.allPosts,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPosts: (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
