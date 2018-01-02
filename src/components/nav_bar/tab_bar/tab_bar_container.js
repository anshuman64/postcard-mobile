// Library Imports
import { connect } from 'react-redux';

// Local Imports
import TabBar          from './tab_bar.js';
import { navigateTo }  from '../../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ navigation }, ownProps) => ({
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen) => dispatch(navigateTo(screen)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabBar);
