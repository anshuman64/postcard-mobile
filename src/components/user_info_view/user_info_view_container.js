// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserInfoView from './user_info_view.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ client, usersCache, imagesCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  imagesCache: imagesCache
});

export default connect(
  mapStateToProps,
)(UserInfoView);
