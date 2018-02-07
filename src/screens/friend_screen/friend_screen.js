// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import TabBar                  from '../../components/tab_bar/tab_bar.js';
import FriendListItemContainer from '../../components/friend_list_item/friend_list_item_container.js';
import { styles }              from './friend_screen_styles.js';
import { UTILITY_STYLES }      from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//


class FriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      tab: 'Pending',
    };
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
    RN.Share.share({message: 'Add me on Insiya! My username is: ' + this.props.usersCache[this.props.client.id].username + '\nhttps://insiya.io' })
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderItem = ({item}) => {
    return (
      <FriendListItemContainer
        userId={item}
        setParentState={this.setParentState}
        />
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

  _renderHeader = () => {
    return (
      <RN.View style={styles.headerView}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => {
            this.addFriendIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
            this.addFriendText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          }}
          onPressOut={() => {
            this.addFriendIcon.setNativeProps({style: styles.headerItemIcon})
            this.addFriendText.setNativeProps({style: UTILITY_STYLES.lightBlackText16})
          }}
          onPress={this._onPressAddFriend}
          >
          <RN.View style={styles.headerItemView}>
            <Icon name={'user-follow'} ref={(ref) => this.addFriendIcon = ref} style={styles.headerItemIcon} />
            <RN.Text ref={(ref) => this.addFriendText = ref} style={UTILITY_STYLES.lightBlackText16}>
              Add Friend by Username
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.TouchableWithoutFeedback
          onPressIn={() => {
            this.shareIcon.setNativeProps({style: UTILITY_STYLES.textHighlighted})
            this.shareText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          }}
          onPressOut={() => {
            this.shareIcon.setNativeProps({style: styles.headerItemIcon})
            this.shareText.setNativeProps({style: UTILITY_STYLES.lightBlackText16})
          }}
          onPress={this._onPressShare}
          >
          <RN.View style={styles.headerItemView}>
            <Icon name={'share'} ref={(ref) => this.shareIcon = ref} style={styles.headerItemIcon} />
            <RN.Text ref={(ref) => this.shareText = ref} style={UTILITY_STYLES.lightBlackText16}>
              Share Username
            </RN.Text>
          </RN.View>
        </RN.TouchableWithoutFeedback>
      </RN.View>
    )
  }

  _renderList() {
    if (this.state.tab === 'Pending') {
      return (
        <RN.SectionList
          sections={[
            {data: this.props.friendships.received, renderItem: this._renderItem.bind(this), title: 'Received Requests'},
            {data: this.props.friendships.sent, renderItem: this._renderItem.bind(this), title: 'Sent Requests'},
          ]}
          keyExtractor={(item) => item}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListHeaderComponent={this._renderHeader()}
          initialListSize={20}
          pageSize={80}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={10000}
          scrollRenderAheadDistance={10000}
        />
      )
    } else {
      return (
        <RN.SectionList
          sections={[
            {data: this.props.friendships.accepted, renderItem: this._renderItem.bind(this), title: 'Friends'},
          ]}
          keyExtractor={(item) => item}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListHeaderComponent={this._renderHeader()}
          initialListSize={20}
          pageSize={80}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={10000}
          scrollRenderAheadDistance={10000}
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
