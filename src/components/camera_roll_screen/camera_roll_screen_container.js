// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CameraRollScreen  from './camera_roll_screen.js';
import { goBackTo }      from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  goBackTo: (screen, props) => dispatch(goBackTo(screen, props)),
});


export default connect(
  null,
  mapDispatchToProps,
)(CameraRollScreen);
