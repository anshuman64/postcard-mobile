// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                  from './header';
import { createPost }          from '../../actions/post_actions';
import { createCircle }        from '../../actions/circle_actions';
import { createGroup }         from '../../actions/group_actions';
import { navigateTo, goBack }  from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:   (authToken, firebaseUserObj, clientId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, clientId, isPublic, recipients, postBody, postImagePath, postImageType, placeholderText)),
  createCircle: (authToken, firebaseUserObj, name, recipientIds) => dispatch(createCircle(authToken, firebaseUserObj, name, recipientIds)),
  createGroup:  (authToken, firebaseUserObj, users) => dispatch(createGroup(authToken, firebaseUserObj, users)),
  navigateTo:   (screen, props) => dispatch(navigateTo(screen, props)),
  goBack:       (props) => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
