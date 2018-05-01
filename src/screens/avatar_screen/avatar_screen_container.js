// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AvatarScreen           from './avatar_screen';
import { editAvatar }         from '../../actions/client_actions';
import { navigateTo, goBack } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, mediaCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  mediaCache: mediaCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editAvatar: (authToken, firebaseUserObj, userId, imagePath, imageType) => dispatch(editAvatar(authToken, firebaseUserObj, userId, imagePath, imageType)),
  navigateTo: (screen, props)                                            => dispatch(navigateTo(screen, props)),
  goBack:     (props)                                                    => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarScreen);
