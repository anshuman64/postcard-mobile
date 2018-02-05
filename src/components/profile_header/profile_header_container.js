// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ProfileHeader                  from './profile_header.js';
import { createFollow, deleteFollow } from '../../actions/follow_actions.js';
import { refreshCredsAndGetImage }    from '../../actions/image_actions.js';
import { refreshAuthToken }           from '../../actions/client_actions.js';
import { navigateTo }                 from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, images }, ownProps) => ({
  authToken:       client.authToken,
  firebaseUserObj: client.firebaseUserObj,
  client:          client.user,
  images:          images,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createFollow:            (authToken, firebaseUserObj, userId, followeeId) => dispatch(createFollow(authToken, firebaseUserObj, userId, followeeId)),
  deleteFollow:            (authToken, firebaseUserObj, userId, followeeId) => dispatch(deleteFollow(authToken, firebaseUserObj, userId, followeeId)),
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
  navigateTo:              (screen, props) => dispatch(navigateTo(screen, props)),
  refreshAuthToken:        (firebaseUserObj, func, ...params) => dispatch(refreshAuthToken(firebaseUserObj, func, ...params)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileHeader);
