// Library Imports
import React       from 'react';
import RN          from 'react-native';
import Firebase    from 'react-native-firebase';
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import { Actions } from 'react-native-router-flux';
import Icon        from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import UserInfoViewContainer from '../../components/user_info_view/user_info_view_container';
import { styles }            from './group_menu_screen_styles';
import { UTILITY_STYLES }    from '../../utilities/style_utility';
import { defaultErrorAlert } from '../../utilities/error_utility';

//--------------------------------------------------------------------//

class GroupMenuScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.isDeleteDisabled = false;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressChangeName = () => {
    this.props.navigateTo('NameGroupScreen', { convoId: this.props.convoId });
  }

  _onPressAddMembers = () => {
    this.props.navigateTo('AddGroupMembersScreen', { convoId: this.props.convoId });
  }

  _onPressDeleteGroup = () => {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    RN.Alert.alert('', 'Are you sure you want to delete this group? This action cannot be undone.',
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: 'Delete', onPress: this._onConfirmDeleteGroup}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  _onConfirmDeleteGroup = () => {
    this.props.deleteGroup(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.convoId)
      .then(() => {
        this.props.navigateTo('FriendScreen');
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isDeleteDisabled = false;
      });
  }

  _onPressDeleteMember(userId, isClient) {
    if (this.isDeleteDisabled) {
      return;
    }

    this.isDeleteDisabled = true;

    let alertString = isClient ? 'Are you sure you want to leave this group?' : 'Are you sure you want to remove this member from the group?';
    let cancelString = isClient ? 'Leave' : 'Remove';

    RN.Alert.alert('', alertString,
      [{text: 'Cancel', onPress: () => this.isDeleteDisabled = false, style: 'cancel'},
       {text: cancelString, onPress: () => this._onConfirmDeleteMember(userId, isClient)}],
       {onDismiss: () => this.isDeleteDisabled = false}
    )
  }

  _onConfirmDeleteMember(userId, isClient) {
    this.props.removeGroupMember(this.props.client.authToken, this.props.client.firebaseUserObj, this.props.convoId, userId, isClient)
      .then(() => {
        if (isClient) {
          this.props.navigateTo('FriendScreen');
        }
      })
      .catch((error) => {
        defaultErrorAlert(error);
      })
      .finally(() => {
        this.isDeleteDisabled = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(iconName, text, iconRef, textRef, callback) {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          iconRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          textRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          iconRef.setNativeProps({style: styles.menuItemIcon})
          textRef.setNativeProps({style: styles.menuItemText})
        }}
        onPress={callback}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => iconRef = ref}
            name={iconName}
            style={styles.menuItemIcon}
            />
          <RN.Text ref={(ref) => textRef = ref} style={styles.menuItemText}>
            {text}
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderItem = ({item}) => {
    return (
      <RN.View style={UTILITY_STYLES.rowView}>
        <RN.View style={styles.userView}>
          <UserInfoViewContainer convoId={item.id} marginLeft={15} />
          <Icon name={'close'} onPress={() => this._onPressDeleteMember(item.id)} style={styles.icon} />
        </RN.View>
      </RN.View>
    )
  }

  _renderHeader() {
    let isClientGroupOwner = this.props.client.id === this.props.groupsCache[this.props.convoId].owner_id;

    return (
      <RN.View>
        {this._renderButton('pencil', 'Change Group Name', this.pencilIcon, this.pencilText, this._onPressChangeName)}
        {this._renderButton('user-follow', 'Add Members', this.followIcon, this.followText, this._onPressAddMembers)}
        {this._renderButton('logout', 'Leave Group', this.logoutIcon, this.logoutText, () => this._onPressDeleteMember(this.props.client.id, true))}
        {isClientGroupOwner ? this._renderButton('close', 'Delete Group', this.closeIcon, this.closeText, this._onPressDeleteGroup) : null}
     </RN.View>
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <RN.View style={UTILITY_STYLES.sectionHeader}>
        <RN.Text style={UTILITY_STYLES.sectionHeaderText}>
          {section.title}
        </RN.Text>
      </RN.View>
    )
  }

  _renderList() {
    return (
      <RN.SectionList
        sections={[{data: this.props.groupsCache[this.props.convoId].users, renderItem: this._renderItem.bind(this), title: 'Members'}]}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        initialListSize={20}
        pageSize={60}
        showsVerticalScrollIndicator={true}
      />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        {this._renderList()}
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default GroupMenuScreen;
