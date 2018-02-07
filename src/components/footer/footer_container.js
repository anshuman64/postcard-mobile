// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Footer          from './footer.js';
import { navigateTo }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ navigation }, ownProps) => ({
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Footer);
