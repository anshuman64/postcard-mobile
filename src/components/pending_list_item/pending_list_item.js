// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';

// Local Imports
import UserInfoViewContainer from '../user_info_view/user_info_view_container';
import { FRIEND_TYPES }      from '../../actions/friendship_actions';
import { styles }            from './pending_list_item_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';

//--------------------------------------------------------------------//

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

  _onPressAcceptFriendship = () => {
    if (this.isButtonDisabled) {
      return;
    }

    this.isButtonDisabled = true;

    this.props.acceptFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.container.fadeOut(500)
          .finally(() => {
            this.props.acceptFriendshipRequest({ friendship: friendship });
            this.isButtonDisabled = false;
          });
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressDeleteFriendship = () => {
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
        this.container.fadeOut(500)
          .finally(() => {
            this.props.removeFriendship({ friendship: friendship, client: this.props.client });
            this.isButtonDisabled = false;
          });
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
        this.container.fadeOut(500)
          .finally(() => {
            this.props.removeBlock({ block: block });
            this.isButtonDisabled = false;
          });
      })
      .catch((error) => {
        this.isButtonDisabled = false;
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButtons() {
    let acceptString;
    let deleteString;
    let friendshipStatus = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].friendship_status_with_client : null;
    let isBlocked = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].is_user_blocked_by_client : false;

    if (friendshipStatus) {
      if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
        acceptString = 'Confirm';
        deleteString = 'Remove';
      } else if (friendshipStatus === FRIEND_TYPES.SENT) {
        deleteString = 'Cancel';
      } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
        deleteString = 'Delete';
      } else {
        acceptString = 'Add';
      }
    }

    if (isBlocked) {
      deleteString = 'Unblock';
    }

    return (
      <RN.View style={styles.buttonView}>
        {friendshipStatus === 'received' || friendshipStatus === 'contacts' ?
          <RN.TouchableOpacity style={styles.confirmButton} onPress={this._onPressAcceptFriendship}>
            <RN.Text style={UTILITY_STYLES.lightWhiteText15}>
              {acceptString}
            </RN.Text>
            </RN.TouchableOpacity> :
            null}
        {friendshipStatus != 'contacts' ?
          <RN.TouchableOpacity style={styles.deleteButton} onPress={isBlocked ? this._onPressUnblock : this._onPressDeleteFriendship}>
            <RN.Text style={UTILITY_STYLES.lightBlackText15}>
              {deleteString}
            </RN.Text>
          </RN.TouchableOpacity> :
          null}
      </RN.View>
    )
  }

  render() {
    return (
      <Animatable.View ref={(ref) => this.container = ref} style={styles.rowView}>
        <UserInfoViewContainer userId={this.props.userId} marginLeft={15} />
        <RN.View style={styles.checkboxView}>
          {this._renderButtons()}
        </RN.View>
      </Animatable.View>
    )
  }
}


//--------------------------------------------------------------------//

export default PendingListItem;
