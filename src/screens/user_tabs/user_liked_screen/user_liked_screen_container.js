// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserLikedScreen from './user_liked_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache }, ownProps) => ({
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(UserLikedScreen);
