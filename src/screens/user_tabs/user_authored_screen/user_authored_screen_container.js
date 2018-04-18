// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserAuthoredScreen from './user_authored_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache }, ownProps) => ({
  usersCache: usersCache,
});

export default connect(
  mapStateToProps,
)(UserAuthoredScreen);
