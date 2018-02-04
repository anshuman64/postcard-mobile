// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import TabBar             from '../../components/tab_bar/tab_bar.js';
import FriendListItem    from '../../components/friend_list_item/friend_list_item.js';
import { styles }         from './friend_screen_styles.js';
import { UTILITY_STYLES } from '../../utilities/style_utility.js';

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

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
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
  // Render Methods
  //--------------------------------------------------------------------//

  _renderFriendItem() {
    return (
      (rowData, sectionID, rowID) => (
        <FriendListItem
          id={rowData.id}
          username={rowData.username}
          avatar_url={rowData.avatar_url}
          setParentState={this.setParentState}
          type={'friend'}
          />
      )
    )
  }

  _renderSentItem = (obj) => {
    return (
      <FriendListItem
        id={obj.item.id}
        username={obj.item.username}
        avatar_url={obj.item.avatar_url}
        setParentState={this.setParentState}
        type={'sent'}
        />
    )
  }

  _renderReceivedItem = (obj) => {
    return (
      <FriendListItem
        id={obj.item.id}
        username={obj.item.username}
        avatar_url={obj.item.avatar_url}
        setParentState={this.setParentState}
        type={'received'}
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

  _renderList() {
    if (this.state.tab === 'Pending') {
      return (
        <RN.SectionList
          sections={[
            {data: sampleData, renderItem: this._renderReceivedItem, title: 'Received Requests'},
            {data: sampleData, renderItem: this._renderSentItem, title: 'Sent Requests'},
          ]}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          initialListSize={20}
          pageSize={80}
          showsVerticalScrollIndicator={true}
          onEndReachedThreshold={10000}
          scrollRenderAheadDistance={10000}
        />
      )
    } else {
      return (
        <RN.ListView
          dataSource={this.ds.cloneWithRows(sampleData)}
          renderRow={this._renderFriendItem()}
          initialListSize={20}
          pageSize={80}
          enableEmptySections={true}
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


export const sampleData = [
  {
    id: 1,
    username: 'anshu',
    avatar_url: 'https://www.google.org/assets/static/images/logo_googledotorg-171e7482e5523603fc0eed236dd772d8.svg'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'aaaaaaaaaaaa',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
  {
    id: 2,
    username: 'keving',
    avatar_url: 'https://www.paklap.pk/media/wysiwyg/MQD32_Pakistan_.png'
  },
]
