// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Medium                       from './medium';
import { refreshCredsAndGetMedium } from '../../actions/medium_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, mediaCache }, ownProps) => ({
  client:     client,
  mediaCache: mediaCache
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  refreshCredsAndGetMedium: (firebaseUserObj, medium) => dispatch(refreshCredsAndGetMedium(firebaseUserObj, medium)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Medium);
