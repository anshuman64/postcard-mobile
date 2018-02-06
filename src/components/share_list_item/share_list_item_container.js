// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ShareListItem               from './share_list_item.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  firebaseUserObj: client.firebaseUserObj,
  usersCache:      usersCache,
  imagesCache:     imagesCache
});

// const mapDispatchToProps = (dispatch, ownProps) => ({
//   refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(ShareListItem);
