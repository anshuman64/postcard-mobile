// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import { CachedImage } from 'react-native-img-cache';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import UserInfoViewContainer from '../user_info_view/user_info_view_container.js';
import { FRIEND_TYPES }      from '../../actions/friendship_actions.js';
import { styles }            from './friend_list_item_styles.js';
import { UTILITY_STYLES }    from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class FriendListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isSelected:  false,
    }

    this.isFriendDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressConfirm = () => {
    if (this.isFriendDisabled) {
      return;
    }

    this.isFriendDisabled = true;

    this.props.acceptFriendRequest(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.container.fadeOut(500)
          .finally(() => {
            this.props.acceptFriendshipRequest({ friendship: friendship });
            this.isFriendDisabled = false;
          });
      })
      .catch((error) => {
        this.isFriendDisabled = false;
        defaultErrorAlert(error);
      });
  }

  _onPressDelete = () => {
    let alertString;
    let cancelString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;;

    if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      alertString = 'Are you sure you want to remove this friend?';
      cancelString = 'Remove';
    } else if (friendshipStatus === FRIEND_TYPES.SENT) {
      alertString = 'Are you sure you want to cancel this friend request?';
      cancelString = 'Cancel';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    }

    RN.Alert.alert(
      '',
      alertString,
      [
        {text: 'Cancel', onPress: () => this.isFriendDisabled = false, style: 'cancel'},
        {text: cancelString, onPress: this._onConfirmDelete},
      ],
      {
        onDismiss: () => this.isFriendDisabled = false
      }
    )
  }

  _onConfirmDelete = () => {
    this.props.deleteFriendship(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.container.fadeOut(500)
          .finally(() => {
            this.props.removeFriendship({ friendship: friendship });
            this.isFriendDisabled = false;
          });
      })
      .catch((error) => {
        this.isFriendDisabled = false;
        defaultErrorAlert(error);
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButtons() {
    let deleteString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;

    if (friendshipStatus) {
      if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
        deleteString = 'Remove';
      } else if (friendshipStatus === FRIEND_TYPES.SENT) {
        deleteString = 'Cancel';
      } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
        deleteString = 'Delete';
      }
    }

    return (
      <RN.View style={styles.buttonView}>
        {friendshipStatus === 'received' ?
          <RN.TouchableOpacity
            style={styles.confirmButton}
            onPress={this._onPressConfirm}
            >
            <RN.Text style={UTILITY_STYLES.lightWhiteText15}>
              Confirm
            </RN.Text>
            </RN.TouchableOpacity> :
            null}
        <RN.TouchableOpacity
          style={styles.deleteButton}
          onPress={this._onPressDelete}
          >
          <RN.Text style={UTILITY_STYLES.lightBlackText15}>
            {deleteString}
          </RN.Text>
        </RN.TouchableOpacity>
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

export default FriendListItem;
