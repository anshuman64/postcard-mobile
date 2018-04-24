// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoginScreen              from './login_screen';
import { getConfirmationCode }  from '../../actions/client_actions';
import { navigateTo }           from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode: (phoneNumber)   => dispatch(getConfirmationCode(phoneNumber)),
  navigateTo:          (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps
)(LoginScreen);
