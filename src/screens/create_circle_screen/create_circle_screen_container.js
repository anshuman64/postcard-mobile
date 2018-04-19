// Library Imports
import { connect } from 'react-redux';

// Local Imports
import CreateCircleScreen from './create_circle_screen';
import { navigateTo }     from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ friendships }, ownProps) => ({
  friendships:   friendships,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCircleScreen);
