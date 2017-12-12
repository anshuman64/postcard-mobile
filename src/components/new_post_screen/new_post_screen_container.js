// Library Imports
import { connect } from 'react-redux';

// Local Imports
import NewPostScreen   from './new_post_screen.js';
import { createPost }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: (post) => dispatch(createPost(post))
});

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(NewPostScreen);
