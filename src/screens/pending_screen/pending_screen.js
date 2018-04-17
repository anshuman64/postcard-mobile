// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import PendingListItemContainer      from '../../components/pending_list_item/pending_list_item_container';
import { styles }                    from './pending_screen_styles';
import { UTILITY_STYLES, scaleFont } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

class PendingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriend = () => {
    this.props.navigateTo('AddPendingScreen');
  }

  _onPressShare = () => {
    RN.Share.share({message: 'Add me on Postcard! My username is: ' + this.props.usersCache[this.props.client.id].username + '\n\n- Download Now -\nwww.insiya.io' })
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

  _renderList() {
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

export default PendingScreen;
