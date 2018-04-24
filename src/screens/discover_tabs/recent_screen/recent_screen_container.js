// Library Imports
import { connect } from 'react-redux';

// Local Imports
import RecentScreen from './recent_screen';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client
});

export default connect(
  mapStateToProps,
)(RecentScreen);
