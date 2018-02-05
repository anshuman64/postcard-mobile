// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AvatarScreen                     from './avatar_screen.js';
import { editAvatar, refreshAuthToken } from '../../actions/client_actions.js';
import { refreshCredsAndGetImage }      from '../../actions/image_actions.js';
import { navigateTo, goBack }           from '../../actions/navigation_actions.js';
import { uploadFile }                   from '../../utilities/file_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, imagesCache }, ownProps) => ({
  client:          client.user,
  authToken:       client.authToken,
  firebaseUserObj: client.firebaseUserObj,
  imagesCache:          imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editAvatar:              (authToken, firebaseUserObj, avatarUrl) => dispatch(editAvatar(authToken, firebaseUserObj, avatarUrl)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
  uploadFile:              (authToken, firebaseUserObj, imagePath, imageType, userId, folderPath) => dispatch(uploadFile(authToken, firebaseUserObj, imagePath, imageType, userId, folderPath)),
  navigateTo:              (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:                  (props) => dispatch(goBack(props)),
  refreshAuthToken:        (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarScreen);
