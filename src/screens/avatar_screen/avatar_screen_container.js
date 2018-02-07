// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AvatarScreen                 from './avatar_screen.js';
import { editAvatar }               from '../../actions/client_actions.js';
import { refreshCredsAndGetImage }  from '../../actions/image_actions.js';
import { navigateTo, goBack }       from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editAvatar:              (authToken, firebaseUserObj, userId, imagePath, imageType) => dispatch(editAvatar(authToken, firebaseUserObj, userId, imagePath, imageType)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
  navigateTo:              (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:                  (props) => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarScreen);
