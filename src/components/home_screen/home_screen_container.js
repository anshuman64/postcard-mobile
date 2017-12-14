// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen                  from './home_screen.js';
import { getPosts, refreshPosts }  from '../../actions/post_actions.js';
import { getCurrentRoute }         from '../../utilities/component_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, posts, nav }, ownProps) => ({
  authToken:    user.authToken,
  allPosts:     posts.allPosts,
  currentRoute: getCurrentRoute(nav),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshPosts: (authToken, postType, queryParams) => dispatch(refreshPosts(authToken, postType, queryParams)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
