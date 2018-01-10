// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CameraRollScreen  from './camera_roll_screen.js';
import { goBack }        from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  goBack: (props) => dispatch(goBack(props)),
});


export default connect(
  null,
  mapDispatchToProps,
)(CameraRollScreen);
