// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen       from './home_screen.js';
import { getAllPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache }, ownProps) => ({
  authToken: user.authToken,
  allPosts: posts.allPosts,
  postsCache: postsCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllPosts: (authToken, queryParams) => dispatch(getAllPosts(authToken, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
