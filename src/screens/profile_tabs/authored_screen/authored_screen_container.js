// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AuthoredScreen from './authored_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:        client,
  usersCache:    usersCache,
});

export default connect(
  mapStateToProps,
)(AuthoredScreen);
