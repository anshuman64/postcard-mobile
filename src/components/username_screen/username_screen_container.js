// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UsernameScreen                                from './username_screen.js';
import {  }  from '../../actions/user_actions.js';
import { navigateTo }                                   from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//


const mapStateToProps = ({ user }, ownProps) => ({
  user: user.user,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateTo: (screen, props) => dispatch(navigateTo(screen, props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameScreen);
