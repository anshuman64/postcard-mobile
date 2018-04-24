// Library Imports
import { connect } from 'react-redux';

// Local Imports
import ShareScreen    from './share_screen';
import { navigateTo } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ conversations, circles }, ownProps) => ({
  conversations: conversations.conversations,
  circles:     circles.circles,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShareScreen);
