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

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

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

    this.props.acceptFriendRequest(this.props.authToken, this.props.firebaseUserObj, this.props.userId)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFriendDisabled = false;
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
        {text: cancelString, onPress: this._onConfirmDeleteReceived},
      ],
      {
        onDismiss: () => this.isFriendDisabled = false
      }
    )
  }

  _onConfirmDelete = () => {
    this.props.deleteFriendship(this.props.authToken, this.props.firebaseUserObj, this.props.userId)
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isFriendDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  _renderButtons() {
    let deleteString;
    let friendshipStatus = this.props.usersCache[this.props.userId].friendship_status_with_client;

    if (friendshipStatus === FRIEND_TYPES.ACCEPTED) {
      deleteString = 'Remove';
    } else if (friendshipStatus === FRIEND_TYPES.SENT) {
      deleteString = 'Cancel';
    } else if (friendshipStatus === FRIEND_TYPES.RECEIVED) {
      deleteString = 'Delete';
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
    let avatarUrl = this.props.usersCache[this.props.userId].avatar_url;

    if (avatarUrl && this.props.imagesCache[avatarUrl]) {
      return (
        <CachedImage
          source={{uri: this.props.imagesCache[avatarUrl].url}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.firebaseUserObj, avatarUrl)}
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
    return (
      <RN.View style={styles.userView}>
        {this._renderAvatar()}
        <RN.Text ref={(ref) => this.usernameText = ref} style={[UTILITY_STYLES.regularBlackText15, {marginLeft: 20}]}>
          {this.props.usersCache[this.props.userId].username}
        </RN.Text>
      </RN.View>
    )
  }

  render() {
    return (
      <RN.View style={styles.rowView}>
        {this._renderUserView()}
        <RN.View style={styles.checkboxView}>
          {this._renderButtons()}
        </RN.View>
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default FriendListItem;
