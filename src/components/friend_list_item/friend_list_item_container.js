// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem               from './header.js';
import { refreshCredsAndGetImage } from '../../../actions/image_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user, images }, ownProps) => ({
  firebaseUserObj: user.firebaseUserObj,
  images: images
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FriendListItem);
