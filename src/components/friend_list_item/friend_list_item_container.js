// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FriendListItem               from './friend_list_item.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, imagesCache }, ownProps) => ({
  firebaseUserObj: client.firebaseUserObj,
  imagesCache: imagesCache
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(FriendListItem);
