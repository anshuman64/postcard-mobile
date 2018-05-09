// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import ListHeader               from '../../components/list_header/list_header';
import PendingListItemContainer from '../../components/pending_list_item/pending_list_item_container';
import SectionListHeader        from '../../components/section_list_header/section_list_header';
import { UTILITY_STYLES }       from '../../utilities/style_utility';
import { isStringEmpty }        from '../../utilities/function_utility';
import { isContactSearched }    from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  -
Optional Screen Props:
  -
*/
class PendingScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      contactSearchText: '',
    }

    this.isSharedPressed = false;
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  setParentState = (state) => {
    this.setState(state);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressAddFriend = () => {
    this.props.navigateTo('AddFriendScreen', { screen: 'AddFriendScreen' });
  }

  _onPressShare = () => {
    if (this.isSharedPressed) {
      return;
    }

    this.isSharedPressed = true;

    RN.Share.share({message: "Add me on Postcard! My username is: \"" + this.props.usersCache[this.props.client.id].username + "\"\n\n-- Download Now --\nhttps://postcard.insiya.io/?utm_source=app&utm_term=share" })
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

  _renderContactItem = ({item}) => {
    return (
      <PendingListItemContainer phoneNumber={item} />
    )
  }

  _renderSectionHeader = ({section}) => {
    return (
      <SectionListHeader title={section.title} contactSearchText={this.state.contactSearchText} setParentState={this.setParentState} />
    )
  }

  _renderHeader = () => {
    return (
      <RN.View>
        <ListHeader text={'Add Friend by Username'} iconName={'user-follow'} callback={this._onPressAddFriend} />
        <ListHeader text={'Share Username'} iconName={'share'} callback={this._onPressShare} />
      </RN.View>
    )
  }

  // NOTE/WARNING: leave keyExtractor exactly as is, or else fadeOut messes up other items around it!
  _renderList() {
    let contacts = this.props.contacts.phoneNumbersWithAccounts.concat(this.props.contacts.phoneNumbersWithoutAccounts);

    return (
      <RN.SectionList
        sections={[
          {data: this.props.friendships.received, renderItem: this._renderItem.bind(this), title: 'Received Requests'},
          {data: this.props.friendships.sent, renderItem: this._renderItem.bind(this), title: 'Sent Requests'},
          {data: this.props.friendships.contacts, renderItem: this._renderItem.bind(this), title: 'Contacts on Postcard'},
          {data: contacts.filter((x) => isContactSearched(x, this.state.contactSearchText, this.props.contactsCache)).slice(0, 250), renderItem: this._renderContactItem.bind(this), title: 'Other Contacts'},
          {data: this.props.blocks.blockedUsers, renderItem: this._renderItem.bind(this), title: 'Blocked Users'},
        ]}
        keyExtractor={(item) => item}
        renderSectionHeader={this._renderSectionHeader.bind(this)}
        ListHeaderComponent={this._renderHeader()}
        initialNumToRender={20}
        windowSize={5}
        showsVerticalScrollIndicator={true}
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

export default PendingScreen;
