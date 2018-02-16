// Library Imports
import { connect } from 'react-redux';

// Local Imports
import NewPostScreen   from './new_post_screen';
import { navigateTo }  from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  null,
  mapDispatchToProps,
)(NewPostScreen);
