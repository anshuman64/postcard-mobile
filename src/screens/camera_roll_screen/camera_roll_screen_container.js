// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CameraRollScreen from './camera_roll_screen';
import { goBack }       from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ photos }, ownProps) => ({
  photos: photos.photos
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  goBack: (props) => dispatch(goBack(props)),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CameraRollScreen);
