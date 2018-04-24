// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UserInfoView          from './user_info_view';
import { navigateToProfile } from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ usersCache, groupsCache }, ownProps) => ({
  usersCache:  usersCache,
  groupsCache: groupsCache,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToProfile: (props) => dispatch(navigateToProfile(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfoView);
