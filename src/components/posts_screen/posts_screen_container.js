// Library Imports
import { connect } from 'react-redux';

// Local Imports
import PostsScreen   from './posts_screen.js';
import { getPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


// const mapStateToProps = ({ user }, ownProps) => ({
//   phoneNumber: user.phoneNumber,
//   confirmationCodeObj: user.confirmationCodeObj
// });

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts: (post) => dispatch(getPosts(post))
});

export default connect(
  // mapStateToProps,
  mapDispatchToProps
)(PostsScreen);
