// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UsernameScreen          from './username_screen.js';
import { editUsername }        from '../../actions/client_actions.js';
import { navigateTo, goBack }  from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, navigation }, ownProps) => ({
  client:          client.user,
  authToken:       client.authToken,
  firebaseUserObj: client.firebaseUserObj,
  currentScreen:   navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(goBack(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameScreen);
