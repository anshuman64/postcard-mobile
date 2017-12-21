// Library Imports
import { connect } from 'react-redux';

// Local Imports
import AppWithNavigationState   from './app_with_navigation_state.js';


//--------------------------------------------------------------------//


const mapStateToProps = (state) => ({
  nav: state.nav
});


//--------------------------------------------------------------------//

// export default connect(
//   mapStateToProps
// )(AppWithNavigationState);
