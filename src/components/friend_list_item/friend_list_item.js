// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import { CachedImage } from 'react-native-img-cache';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { FRIEND_TYPES }     from '../../actions/friendship_actions.js';
import { styles }           from './friend_list_item_styles.js';
import { UTILITY_STYLES }   from '../../utilities/style_utility.js';

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

  _renderAvatar() {
    let avatarUrl = this.props.usersCache[this.props.userId] ? this.props.usersCache[this.props.userId].avatar_url : null;

    if (avatarUrl && this.props.imagesCache[avatarUrl]) {
      return (
        <CachedImage
          source={{uri: this.props.imagesCache[avatarUrl].url}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.client.firebaseUserObj, avatarUrl)}
          />
      )
    } else if (avatarUrl && !this.props.imagesCache[avatarUrl]) {
      return (
        <RN.View style={{width: 40}} />
      )
    } else {
      return (
        <Icon name='user' style={styles.userIcon} />
      )
    }
  }

  _renderUserView() {
    let username = this.props.usersCache[this.props.userId].username;

    return (
      <RN.View style={styles.userView}>
        <RN.View style={styles.frame}>
          {this._renderAvatar()}
        </RN.View>
        <RN.Text ref={(ref) => this.usernameText = ref} style={UTILITY_STYLES.regularBlackText15}>
          {username}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
      <Animatable.View ref={(ref) => this.container = ref} style={styles.rowView}>
        {this._renderUserView()}
        <RN.View style={styles.checkboxView}>
          {this._renderButtons()}
        </RN.View>
      </Animatable.View>
    )
  }
}


//--------------------------------------------------------------------//

export default FriendListItem;
