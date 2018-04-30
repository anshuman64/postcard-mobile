// Library Imports
import { connect } from 'react-redux';

// Local Imports
import DebugLoginScreen from './debug_login_screen';
import { debugSignIn }  from '../../actions/client_actions';
import { navigateTo }   from '../../actions/navigation_actions';
import { uploadFile }   from '../../utilities/file_utility';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, contactsCache, navigation }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
  contactsCache: contactsCache,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  debugSignIn: (email, password) => dispatch(debugSignIn(email, password)),
  navigateTo:  (screen, props)   => dispatch(navigateTo(screen, props)),
  uploadFile: (authToken, firebaseUserObj, imagePath, imageType, userId, folderPath) => dispatch(uploadFile(authToken, firebaseUserObj, imagePath, imageType, userId, folderPath))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DebugLoginScreen);
