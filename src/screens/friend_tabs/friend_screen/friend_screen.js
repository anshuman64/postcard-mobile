// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import ConversationListItemContainer       from '../../../components/conversation_list_item/conversation_list_item_container';
import ListFooter                    from '../../../components/list_footer/list_footer'
import { styles }                    from './friend_screen_styles';
import { UTILITY_STYLES, scaleFont } from '../../../utilities/style_utility';

//--------------------------------------------------------------------//

class FriendScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriends = () => {
    this.props.navigateTo('PendingScreen');
  }

  _onPressCreateGroup = () => {
    this.props.navigateTo('CreateGroupScreen', { isCircle: false });
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
      <RN.View style={styles.sectionHeader}>
        <RN.Text style={styles.sectionHeaderText}>
          {section.title}
        </RN.Text>
      </RN.View>
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

  _renderHeader = () => {
    return (
      <RN.TouchableOpacity onPress={this._onPressCreateGroup}>
        <RN.View style={styles.headerItemView}>
          <Icon name={'people'} style={[styles.headerItemIcon, UTILITY_STYLES.textHighlighted]} />
          <RN.Text style={[UTILITY_STYLES.lightBlackText16, UTILITY_STYLES.textHighlighted]}>
            {'Create Group'}
          </RN.Text>
        </RN.View>
      </RN.TouchableOpacity>
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
