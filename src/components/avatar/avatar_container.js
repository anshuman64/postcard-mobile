// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Avatar                      from './avatar';
import { refreshCredsAndGetImage } from '../../actions/medium_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache, mediaCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
  mediaCache: mediaCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetImage: (firebaseUserObj, avatarUrl) => dispatch(refreshCredsAndGetImage(firebaseUserObj, avatarUrl)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
