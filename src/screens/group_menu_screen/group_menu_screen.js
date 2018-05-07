// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import MenuListItem             from '../../components/menu_list_item/menu_list_item';
import SectionListHeader        from '../../components/section_list_header/section_list_header';
import EntityInfoViewContainer    from '../../components/entity_info_view/entity_info_view_container';
import { styles }               from './group_menu_screen_styles';
import { UTILITY_STYLES }       from '../../utilities/style_utility';
import { defaultErrorAlert }    from '../../utilities/error_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  convoId (int): id of group
Optional Screen Props:
  -
*/
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
    this.props.navigateTo('NameGroupScreen', { convoId: this.props.convoId, screen: 'NameGroupScreen' });
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

  _renderItem = ({item}) => {
    return (
      <RN.View style={UTILITY_STYLES.rowView}>
        <RN.View style={styles.userView}>
          <EntityInfoViewContainer entityId={item.id} marginLeft={0} subtractWidth={140} />
          <Icon name={'close'} onPress={() => this._onPressDeleteMember(item.id)} style={styles.icon} />
        </RN.View>
      </RN.View>
    )
  }

  _renderHeader() {
    let isClientGroupOwner = this.props.client.id === this.props.groupsCache[this.props.convoId].owner_id;

    return (
      <RN.View>
        <MenuListItem iconName={'pencil'} text={'Change Group Name'} callback={this._onPressChangeName} />
        <MenuListItem iconName={'user-follow'} text={'Add Members'} callback={this._onPressAddMembers} />
        <MenuListItem iconName={'logout'} text={'Leave Group'} callback={() => this._onPressDeleteMember(this.props.client.id, true)} />
        {isClientGroupOwner ? <MenuListItem iconName={'close'} text={'Delete Group'} callback={this._onPressDeleteGroup} /> : null}
     </RN.View>
    )
  }

  _renderSectionHeader = ({section}) => {
    if (section.title) {
      return (
        <SectionListHeader title={section.title} />
      )
    } else {
      return null;
    }
  }

  _renderList() {
    return (
      <RN.SectionList
        sections={[{data: this.props.groupsCache[this.props.convoId].users, renderItem: this._renderItem.bind(this), title: 'Members'}]}
        keyExtractor={(item, index) => String(index)}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        initialNumToRender={20}
        windowSize={20}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
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
