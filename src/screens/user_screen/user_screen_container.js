// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserScreen  from './user_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache }, ownProps) => ({
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(UserScreen);
