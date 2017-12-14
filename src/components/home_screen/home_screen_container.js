// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen           from './home_screen.js';
import { getAllPosts }      from '../../actions/post_actions.js';
import { getCurrentRoute }  from '../../utilities/component_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, postsCache, nav }, ownProps) => ({
  authToken: user.authToken,
  allPosts: posts.allPosts,
  postsCache: postsCache,
  currentRoute: getCurrentRoute(nav),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getAllPosts: (authToken, isRefresh, queryParams) => dispatch(getAllPosts(authToken, isRefresh, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
