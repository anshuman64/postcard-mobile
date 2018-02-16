// Library Imports
import { connect } from 'react-redux';

// Local Imports
import UsernameScreen          from './username_screen';
import { editUsername }        from '../../actions/client_actions';
import { navigateTo, goBack }  from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client, navigation }, ownProps) => ({
  client:        client,
  currentScreen: navigation.currentScreen
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  editUsername: (authToken, firebaseUserObj, username) => dispatch(editUsername(authToken, firebaseUserObj, username)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(goBack(props))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsernameScreen);
