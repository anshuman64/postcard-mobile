// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as _          from 'lodash';
import { CachedImage } from 'react-native-img-cache';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
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
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressConfirm = () => {

  }

  _onPressDelete = () => {
    let alertString;
    let cancelString;

    if (this.props.type === 'friend') {
      alertString = 'Are you sure you want to remove this friend?';
      cancelString = 'Remove';
    } else if (this.props.type === 'sent') {
      alertString = 'Are you sure you want to cancel this friend request?';
      cancelString = 'Cancel';
    } else {
      alertString = 'Are you sure you want to delete this friend request?';
      cancelString = 'Delete';
    }

    RN.Alert.alert(
      '',
      alertString,
      [
        {text: 'Cancel', onPress: () => this.isFollowDisabled = false, style: 'cancel'},
        {text: cancelString, onPress: this._onConfirmDeleteReceived},
      ],
      {
        onDismiss: () => this.isFollowDisabled = false
      }
    )
  }

  _onConfirmDelete = () => {

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//


  _renderButtons() {
    let deleteString;

    if (this.props.type === 'friend') {
      deleteString = 'Remove';
    } else if (this.props.type === 'sent') {
      deleteString = 'Cancel';
    } else {
      deleteString = 'Delete';
    }

    return (
      <RN.View style={styles.buttonView}>
        {this.props.type === 'received' ?
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
    if (this.props.avatar_url && this.props.imagesCache[this.props.avatar_url]) {
      return (
        <CachedImage
          source={{uri: this.props.imagesCache[this.props.avatar_url].url}}
          style={styles.avatarImage}
          resizeMode={'cover'}
          onError={() => this.props.refreshCredsAndGetImage(this.props.firebaseUserObj, this.props.avatar_url)}
          />
      )
    } else if (this.props.avatar_url && !this.props.imagesCache[this.props.avatar_url]) {
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
          {this.props.username}
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
