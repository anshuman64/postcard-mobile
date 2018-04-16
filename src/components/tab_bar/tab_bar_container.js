// Library Imports
import { connect } from 'react-redux';

// Local Imports
import TabBar         from './tab_bar';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//


const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps,
)(TabBar);
