// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserInfoView                from './user_info_view.js';
import { navigateToProfile }       from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, usersCache }, ownProps) => ({
  client:      client,
  usersCache:  usersCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToProfile: (props) => dispatch(navigateToProfile(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoView);
