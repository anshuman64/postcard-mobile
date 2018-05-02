// Library Imports
import { connect } from 'react-redux';

// Local Imports
import Header                           from './header';
import { createPost, forwardPost }      from '../../actions/post_actions';
import { createCircle }                 from '../../actions/circle_actions';
import { createGroup, addGroupMembers } from '../../actions/group_actions';
import { navigateTo, goBack }           from '../../actions/navigation_actions';

//--------------------------------------------------------------------//

const mapStateToProps = ({ client }, ownProps) => ({
  client: client,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  createPost:      (authToken, firebaseUserObj, clientId, isPublic, recipientIds, contactPhoneNumbers, postBody, media, placeholderText) => dispatch(createPost(authToken, firebaseUserObj, clientId, isPublic, recipientIds, contactPhoneNumbers, postBody, media, placeholderText)),
  forwardPost:     (authToken, firebaseUserObj, clientId, isPublic, recipientIds, contactPhoneNumbers, postId) => dispatch(forwardPost(authToken, firebaseUserObj, clientId, isPublic, recipientIds, contactPhoneNumbers, postId)),
  createCircle:    (authToken, firebaseUserObj, name, recipientIds)                    => dispatch(createCircle(authToken, firebaseUserObj, name, recipientIds)),
  createGroup:     (authToken, firebaseUserObj, userIds, contactPhoneNumbers)          => dispatch(createGroup(authToken, firebaseUserObj, userIds, contactPhoneNumbers)),
  addGroupMembers: (authToken, firebaseUserObj, groupId, userIds, contactPhoneNumbers) => dispatch(addGroupMembers(authToken, firebaseUserObj, groupId, userIds, contactPhoneNumbers)),
  navigateTo:      (screen, props)                                                     => dispatch(navigateTo(screen, props)),
  goBack:          (props)                                                             => dispatch(goBack(props)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
