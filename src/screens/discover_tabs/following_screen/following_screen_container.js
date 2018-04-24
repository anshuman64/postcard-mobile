// Library Imports
import { connect } from 'react-redux';

// Local Imports
import FollowingScreen  from './following_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

export default connect(
  mapStateToProps,
)(FollowingScreen);
