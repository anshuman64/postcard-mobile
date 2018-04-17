// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import FriendListItemContainer       from '../../../components/friend_list_item/friend_list_item_container';
import ListFooter                    from '../../../components/list_footer/list_footer'
import { styles }                    from './friend_screen_styles';
import { UTILITY_STYLES, scaleFont } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

class FriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriends = () => {
    this.props.navigateTo('PendingScreen');
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <FriendListItemContainer userId={rowData} />
    )
  }

  _renderFooter = () => {
    return (
      <RN.TouchableWithoutFeedback onPress={this._onPressAddFriends}>
        <RN.View>
          <ListFooter footerWidth={scaleFont(200)} text={'No more Friends?'} highlightedText={' Add Friends'} />
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderList() {
    return (
      <RN.ListView
        dataSource={this.ds.cloneWithRows(this.props.friendships.accepted)}
        style={styles.cameraRoll}
        renderRow={this._renderRow}
        initialListSize={20}
        pageSize={60}
        contentContainerStyle={styles.contentContainerStyle}
        enableEmptySections={true}
        showsVerticalScrollIndicator={false}
        onEndReached={this._onEndReached}
        renderFooter={this._renderFooter}
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

export default FriendScreen;
