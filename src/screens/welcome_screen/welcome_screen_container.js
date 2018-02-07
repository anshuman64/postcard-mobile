// Library Imports
import { connect } from 'react-redux';

// Local Imports
import WelcomeScreen   from './welcome_screen.js';
import { navigateTo }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps
)(WelcomeScreen);
