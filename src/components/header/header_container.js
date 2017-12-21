// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header          from './header.js';
import { createPost }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost: (authToken, postObj) => dispatch(createPost(authToken, postObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
