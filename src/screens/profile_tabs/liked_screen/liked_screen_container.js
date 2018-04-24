// Library Imports
import { connect } from 'react-redux';

// Local Imports
import LikedScreen from './liked_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:     client,
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(LikedScreen);
