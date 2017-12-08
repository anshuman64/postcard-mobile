// Library Imports
import { connect } from 'react-redux';

// Local Imports
import HomeScreen    from './home_screen.js';
import { getPosts }  from '../../actions/post_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  authToken: user.authToken,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getPosts: (queryParams, authToken) => dispatch(getPosts(queryParams, authToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
