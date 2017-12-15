// Library Imports
import { connect } from 'react-redux';

// Local Imports
import MenuScreen  from './menu_screen.js';
import { getCurrentRoute }  from '../../utilities/function_utility.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ nav }, ownProps) => ({
  currentScreen: getCurrentRoute(nav),
  lastScreen: nav.lastScreen,
});

export default connect(
  mapStateToProps
)(MenuScreen);
