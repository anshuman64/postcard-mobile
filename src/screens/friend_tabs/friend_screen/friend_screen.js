// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import ListHeader                    from '../../../components/list_header/list_header';
import ConversationListItemContainer from '../../../components/conversation_list_item/conversation_list_item_container';
import ListFooter                    from '../../../components/list_footer/list_footer';
import SectionListHeader             from '../../../components/section_list_header/section_list_header';
import { UTILITY_STYLES, scaleFont } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class FriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriends = () => {
    this.props.navigateTo('PendingScreen');
  }

  _onPressCreateGroup = () => {
    this.props.navigateTo('CreateGroupScreen', { isCreateGroup: true });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderItem = ({item}) => {
    return (
      <ConversationListItemContainer convoId={item} />
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <SectionListHeader title={section.title} />
    )
  }

  _renderFooter = () => {
    return (
      <ListFooter footerWidth={scaleFont(200)} text={'No more Friends?'} highlightedText={' Add Friends'} callback={this._onPressAddFriends} />
    )
  }

  _renderHeader = () => {
    return (
      <ListHeader text={'Create Group'} iconName={'people'} callback={this._onPressCreateGroup} />
    )
  }

  _renderList() {
    return (
      <RN.SectionList
        sections={[{data: this.props.conversations, renderItem: this._renderItem.bind(this), title: 'Conversations'}]}
        keyExtractor={(item) => item}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        ListFooterComponent={this._renderFooter()}
        initialListSize={20}
        pageSize={60}
        showsVerticalScrollIndicator={false}
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
