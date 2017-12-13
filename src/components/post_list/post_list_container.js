// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostList                    from './post_list.js';
// import { deletePost }              from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   createLike: (authToken, likeObj) => dispatch(createLike(authToken, likeObj)),
//   deleteLike: (authToken, postId) => dispatch(deleteLike(authToken, postId)),
//   deletePost: (authToken, postId) => dispatch(deletePost(authToken, postId)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(PostList);
