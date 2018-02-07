// Library Imports
import { connect } from 'react-redux';

// Local Imports
import NewPostScreen   from './new_post_screen.js';
import { navigateTo }  from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps,
)(NewPostScreen);
