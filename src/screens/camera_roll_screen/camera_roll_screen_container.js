// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CameraRollScreen from './camera_roll_screen';
import { goBack }       from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  goBack: (props) => dispatch(goBack(props)),
});


export default connect(
  null,
  mapDispatchToProps,
)(CameraRollScreen);
