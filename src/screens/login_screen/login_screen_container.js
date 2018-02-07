// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen              from './login_screen.js';
import { getConfirmationCode }  from '../../actions/client_actions.js';
import { navigateTo }           from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode: (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  navigateTo:          (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
