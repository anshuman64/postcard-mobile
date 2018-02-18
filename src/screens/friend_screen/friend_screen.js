// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import TabBar                        from '../../components/tab_bar/tab_bar';
import FriendListItemContainer       from '../../components/friend_list_item/friend_list_item_container';
import PendingListItemContainer      from '../../components/pending_list_item/pending_list_item_container';
import { styles }                    from './friend_screen_styles';
import { UTILITY_STYLES, scaleFont } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class FriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      tab: 'Friends',
    };

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.isSharedPressed = false;
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to ProfileHeader for tab switching
  setParentState = (state) => {
    let func = () => {
      this.setState(state);
    }

    return func;
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriend = () => {
    this.props.navigateTo('AddFriendScreen');
  }

  _onPressShare = () => {
    if (this.isSharedPressed) {
      return;
    }

    this.isSharedPressed = true;

    RN.Share.share({message: 'Add me on Postcard! My username is: ' + this.props.usersCache[this.props.client.id].username + '\n\n- Download Now -\nwww.insiya.io' })
      .finally(() => {
        this.isSharedPressed = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderItem = ({item}) => {
    return (
      <PendingListItemContainer userId={item} />
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <RN.View style={styles.sectionHeader}>
        <RN.Text style={styles.sectionHeaderText}>
          {section.title}
        </RN.Text>
      </RN.View>
    )
  }

  _renderHeaderItem = (iconName, title, callback) => {
    return (
      <RN.TouchableOpacity onPress={callback}>
        <RN.View style={styles.headerItemView}>
          <Icon name={iconName} style={[styles.headerItemIcon, UTILITY_STYLES.textHighlighted]} />
          <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.textHighlighted]}>
            {title}
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
    )
  }

  _renderHeader = () => {
    return (
      <RN.View style={styles.headerView}>
        {this._renderHeaderItem('user-follow', 'Add Friend by Username', this._onPressAddFriend)}
        {this._renderHeaderItem('share', 'Share Username', this._onPressShare)}
      </RN.View>
    )
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <FriendListItemContainer userId={rowData} />
    )
  }

  _renderList() {
    if (this.state.tab === 'Pending') {
      return (
        <RN.SectionList
          sections={[
            {data: this.props.friendships.received, renderItem: this._renderItem.bind(this), title: 'Received Requests'},
            {data: this.props.friendships.sent, renderItem: this._renderItem.bind(this), title: 'Sent Requests'},
            {data: this.props.blocks.blockedUsers, renderItem: this._renderItem.bind(this), title: 'Blocked Users'},
          ]}
          keyExtractor={(item) => item}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListHeaderComponent={this._renderHeader()}
          initialListSize={20}
          pageSize={60}
          showsVerticalScrollIndicator={true}
        />
      )
    } else {
      return (
        <RN.ListView
          dataSource={this.ds.cloneWithRows(this.props.friendships.accepted)}
          style={styles.cameraRoll}
          renderRow={this._renderRow}
          renderHeader={this.props.friendships.accepted.length === 0 ? this._renderHeader : null}
          initialListSize={20}
          pageSize={60}
          contentContainerStyle={styles.contentContainerStyle}
          enableEmptySections={true}
          showsVerticalScrollIndicator={false}
          onEndReached={this._onEndReached}
          />
      )
    }
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <TabBar screen={'FriendScreen'} tab={this.state.tab} setParentState={this.setParentState} />
        {this._renderList()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default FriendScreen;
