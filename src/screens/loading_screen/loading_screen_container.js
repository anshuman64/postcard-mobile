// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen  from './loading_screen.js';
import { loginClient }  from '../../actions/client_actions.js';
import { navigateTo } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
  loginClient: (firebaseUserObj) => dispatch(loginClient(firebaseUserObj))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
