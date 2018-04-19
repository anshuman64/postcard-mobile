// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ConfirmCodeScreen                               from './confirm_code_screen';
import { getConfirmationCode, verifyConfirmationCode } from '../../actions/client_actions';
import { navigateTo }                                  from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getConfirmationCode:    (phoneNumber) => dispatch(getConfirmationCode(phoneNumber)),
  verifyConfirmationCode: (confirmationCodeObj, inputtedCode) => dispatch(verifyConfirmationCode(confirmationCodeObj, inputtedCode)),
  navigateTo:             (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmCodeScreen);
