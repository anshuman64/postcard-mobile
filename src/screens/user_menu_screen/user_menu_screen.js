// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import HeaderContainer          from '../../components/header/header_container';
import MenuListItem             from '../../components/menu_list_item/menu_list_item';
import { getEntityDisplayName } from '../../utilities/entity_utility';
import { UTILITY_STYLES }       from '../../utilities/style_utility';
import { defaultErrorAlert }    from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  userId (int): id of user
Optional Screen Props:
  -
*/
class UserMenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isUnfriendDisabled = false;
    this.isBlockDisabled    = false;
  }

  //--------------------------------------------------------------------//
  // Unfriend Callback Methods
  //--------------------------------------------------------------------//

  _onPressUnfriend = () => {
    if (this.isUnfriendDisabled) {
      return;
    }

    this.isUnfriendDisabled = true;

    let alertString = 'Are you sure you want to remove this friend?';
    let cancelString = 'Remove';

    RN.Alert.alert('', alertString,
      [{text: 'Cancel', onPress: () => this.isUnfriendDisabled = false, style: 'cancel'},
       {text: cancelString, onPress: this._onConfirmUnfriend}],
       {onDismiss: () => this.isUnfriendDisabled = false}
    )
  }

  _onConfirmUnfriend = () => {
    this.props.deleteFriendship(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then((friendship) => {
        this.props.removeFriendship({ friendship: friendship });
        this.props.navigateTo('FriendScreen');
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isUnfriendDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Block Callback Methods
  //--------------------------------------------------------------------//

  // Creates or deletes follow from DB
  _onPressBlock = () => {
    if (this.isBlockDisabled) {
      return;
    }

    this.isBlockDisabled = true;

    RN.Alert.alert('', "Are you sure you want to block this user? You can't be this user's friend and won't see this user's posts.",
      [{text: 'Cancel', onPress: () => this.isBlockDisabled = false, style: 'cancel'},
       {text: 'Block', onPress: this._onConfirmBlock}],
       {onDismiss: () => this.isBlockDisabled = false}
    )
  }

  // Deletes follow from DB and updates ProfileScreen as necessary
  _onConfirmBlock = () => {
    this.props.createBlock(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.userId)
      .then(() => {
        this._onConfirmUnfriend();
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isBlockDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    let displayName = getEntityDisplayName(this.props.userId, this.props.usersCache, this.props.groupsCache, this.props.contactsCache);
    let backTitle   = displayName + "'s Settings";

    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer backIcon={true} backTitle={backTitle} />
        <MenuListItem iconName={'user'}          text={'View Profile'}   callback={() => this.props.navigateToProfile({ userId: this.props.userId })}/>
        <MenuListItem iconName={'user-unfollow'} text={'Unfriend User'}  callback={this._onPressUnfriend}/>
        <MenuListItem iconName={'close'}         text={'Block User'}     callback={this._onPressBlock}/>
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default UserMenuScreen;
