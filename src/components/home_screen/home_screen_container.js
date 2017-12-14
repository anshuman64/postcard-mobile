// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen                        from './home_screen.js';
import { getPosts, refreshAndGetPosts }  from '../../actions/post_actions.js';
import { getCurrentRoute }               from '../../utilities/component_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, nav }, ownProps) => ({
  authToken:    user.authToken,
  allPosts:     posts.allPosts,
  currentRoute: getCurrentRoute(nav),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts:           (authToken, postType, queryParams) => dispatch(getPosts(authToken, postType, queryParams)),
  refreshAndGetPosts: (authToken, postType, queryParams) => dispatch(refreshAndGetPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
