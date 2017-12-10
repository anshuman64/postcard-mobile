// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LoadingScreen                                                                                       from './loading_screen.js';
import { getUserOnAuthStateChange, receivePhoneNumber, receiveFirebaseUserObj, getAuthToken, createUser }  from '../../actions/user_actions.js';


//--------------------------------------------------------------------//

// TODO: what is ownProps?
const mapStateToProps = ({ user }, ownProps) => ({
  phoneNumber: user.phoneNumber,
  firebaseUserObj: user.firebaseUserObj,
  authToken: user.authToken,
  user: user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  getUserOnAuthStateChange: (callback) => dispatch(getUserOnAuthStateChange(callback)),
  receivePhoneNumber: (phoneNumber) => dispatch(receivePhoneNumber(phoneNumber)),
  receiveFirebaseUserObj: (user) => dispatch(receiveFirebaseUserObj(user)),
  getAuthToken: (firebaseUserObj) => dispatch(getAuthToken(firebaseUserObj)),
  createUser: (phoneNumber, authToken) => dispatch(createUser(phoneNumber, authToken)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingScreen);
