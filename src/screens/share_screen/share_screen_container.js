// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ShareScreen  from './share_screen.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships }, ownProps) => ({
  friendships:   friendships,
});

export default connect(
  mapStateToProps,
)(ShareScreen);
