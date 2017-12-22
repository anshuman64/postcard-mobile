// Library Imports
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Local Imports
import Footer                  from './footer.js';
import { navigateTo, goBack }  from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  currentScreen: Actions.currentScene
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen) => dispatch(navigateTo(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
