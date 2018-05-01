// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Avatar                      from './avatar';
import { refreshCredsAndGetMedium } from '../../actions/medium_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, mediaCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  mediaCache: mediaCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetMedium: (firebaseUserObj, medium) => dispatch(refreshCredsAndGetMedium(firebaseUserObj, medium)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
