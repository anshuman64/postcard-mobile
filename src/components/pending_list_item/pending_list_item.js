// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import ContactInfoViewContainer from '../contact_info_view/contact_info_view_container';
import UserInfoViewContainer    from '../user_info_view/user_info_view_container';
import { FRIEND_TYPES }         from '../../actions/friendship_actions';
import { styles }               from './pending_list_item_styles';
import { UTILITY_STYLES }       from '../../utilities/style_utility';
import { defaultErrorAlert }    from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  userId (int): id of user
  phoneNumber (string): phoneNumber of contact
Optional Passed Props:
  -
*/
class PendingListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected:  false,
    }

    this.isButtonDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriend = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    this.props.createFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.props.sendFriendshipRequest({ friendship: friendship });
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressAcceptFriendship = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    this.props.acceptFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.props.acceptFriendshipRequest({ friendship: friendship });
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressDeleteFriendship = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    let alertString;
    let cancelString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;;

    if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      alertString = 'Are you sure you want to remove this friend?';
      cancelString = 'Remove';
    } else if (friendshipStatus === FRIEND_TYPES.SENT) {
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    }

    RN.Alert.alert('', alertString,
      [{text: 'Cancel', onPress: () => this.isButtonDisabled = false, style: 'cancel'},
       {text: cancelString, onPress: this._onConfirmDeleteFriendship}],
       {onDismiss: () => this.isButtonDisabled = false}
    )
  }

  _onConfirmDeleteFriendship = () => {
    this.props.deleteFriendship(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.props.removeFriendship({ friendship: friendship, client: this.props.client });
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressUnblock = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    this.props.deleteBlock(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((block) => {
        this.props.removeBlock({ block: block });
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressInviteContact = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    this.props.inviteContact(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.phoneNumber)
      .then(() => {
        this.isButtonDisabled = false;
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderAcceptButton(friendshipStatus, acceptString) {
    let callback;

    if (friendshipStatus === 'received') {
      callback = this._onPressAcceptFriendship;
    } else if (friendshipStatus === 'contacts') {
      callback = this._onPressAddFriend;
    } else {
      callback = this._onPressInviteContact;
    }

    return (
      <RN.TouchableOpacity style={styles.confirmButton} onPress={callback}>
        <RN.Text style={UTILITY_STYLES.lightWhiteText15}>
          {acceptString}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderDeleteButton(isBlocked, deleteString) {
    let callback;

    if (deleteString === 'Unblock') {
      callback = this._onPressUnblock;
    } else if (deleteString === 'Invited') {
      callback = null;
    } else {
      callback = this._onPressDeleteFriendship;
    }

    return (
      <RN.TouchableOpacity style={styles.deleteButton} onPress={callback} disabled={!callback}>
        <RN.Text style={UTILITY_STYLES.lightBlackText15}>
          {deleteString}
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  render() {
    let acceptString;
    let deleteString;
    let user = this.props.usersCache[this.props.userId];
    let friendshipStatus = user ? user.friendship_status_with_client : null;
    let isBlocked = user ? user.is_user_blocked_by_client : false;
    let messagePreview = null;

    if (friendshipStatus) {
      if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
        deleteString = 'Remove';
      } else if (friendshipStatus === FRIEND_TYPES.SENT) {
        deleteString = 'Cancel';
      } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
        acceptString = 'Confirm';
        deleteString = 'Delete';
      } else if (friendshipStatus === FRIEND_TYPES.CONTACTS) {
        acceptString = 'Add';
        contact = this.props.contactsCache[user.phone_number];
        messagePreview = contact.given_name + ' ' + contact.family_name;
      }
    } else {
      if (isBlocked) {
        deleteString = 'Unblock';
      } else {
        if (this.props.contactsCache[this.props.phoneNumber].is_invited) {
          deleteString = 'Invited';
        } else {
          acceptString = 'Invite';
        }
      }
    }

    return (
      <Animatable.View ref={(ref) => this.container = ref} style={UTILITY_STYLES.rowView}>
        {!friendshipStatus && !isBlocked ?
        <ContactInfoViewContainer phoneNumber={this.props.phoneNumber} marginLeft={15} messagePreview={messagePreview} /> :
        <UserInfoViewContainer convoId={this.props.userId} marginLeft={15} messagePreview={messagePreview} />}
        <RN.View style={styles.checkboxView}>
          <RN.View style={styles.buttonView}>
            {acceptString ? this._renderAcceptButton(friendshipStatus, acceptString) : null}
            {deleteString ? this._renderDeleteButton(isBlocked, deleteString) : null}
          </RN.View>
        </RN.View>
      </Animatable.View>
    )
  }
}


//--------------------------------------------------------------------//

export default PendingListItem;
