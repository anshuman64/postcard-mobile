// Library Imports
import React           from 'react';
import RN              from 'react-native';

// Local Imports
import HeaderContainer                        from '../../components/header/header_container';
import SectionListHeader                      from '../../components/section_list_header/section_list_header';
import CheckboxListItemContainer              from '../../components/checkbox_list_item/checkbox_list_item_container';
import ListFooter                             from '../../components/list_footer/list_footer';
import { UTILITY_STYLES, scaleFont }          from '../../utilities/style_utility';
import { isConvoSearched, isContactSearched } from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  convoId (int): id of group when adding members
Optional Screen Props:
  -
*/
class CreateGroupScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      recipients:        [],
      contactRecipients: [],
      contactSearchText: '',
      convoSearchText:   '',
    };
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to CheckboxListItem for updating state
  setParentState = (state) => {
    this.setState(state);
  }

  onPressOtherContactsHelp = () => {
    RN.Alert.alert('', "Invite your contacts to join Postcard. Your friend request, messages, and posts will be waiting for them when they log in!", [{text: 'OK', style: 'cancel'}]);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderUserItem = ({item}) => {
    // If the group already has the user, don't add it
    if ((this.props.convoId && this.props.groupsCache[this.props.convoId].users.map(a => a.id).includes(item)) || !isConvoSearched(item, this.state.convoSearchText, this.props.usersCache, this.props.groupsCache, this.props.contactsCache)) {
      return null;
    } else {
      return (
        <CheckboxListItemContainer
          convoId={item}
          recipients={this.state.recipients}
          setParentState={this.setParentState}
          />
      )
    }
  }

  _renderContactItem = ({item}) => {
    let contact = this.props.contactsCache[item];

    if (isContactSearched(contact, this.state.contactSearchText)) {
      return (
        <CheckboxListItemContainer
          phoneNumber={item}
          contactRecipients={this.state.contactRecipients}
          setParentState={this.setParentState}
          />
      )
    } else {
      return null;
    }
  }

  _renderSectionHeader = ({section}) => {
    if (section.title === 'Other Contacts') {
      return (
        <SectionListHeader title={section.title} iconName={'question'} callback={this.onPressOtherContactsHelp} contactSearchText={this.state.contactSearchText} setParentState={this.setParentState}/>
      )
    } else if (section.title) {
      return (
        <SectionListHeader title={section.title} convoSearchText={this.state.convoSearchText} setParentState={this.setParentState}/>
      )
    } else {
      return null;
    }
  }

  _renderFooter = () => {
    return (
      <ListFooter footerWidth={scaleFont(120)} text={'No more Friends'} />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          createGroupButton={this.props.convoId ? false : true}
          addGroupMembersButton={this.props.convoId ? true : false}
          convoId={this.props.convoId}
          recipients={this.state.recipients}
          contactRecipients={this.state.contactRecipients}
          />
        <RN.SectionList
          sections={[
            {data: this.props.friendships.accepted, renderItem: this._renderUserItem.bind(this), title: 'Friends'},
            {data: this.props.contacts.phoneNumbersWithAccounts, renderItem: this._renderContactItem.bind(this), title: 'Other Contacts'},
            {data: this.props.contacts.phoneNumbersWithoutAccounts, renderItem: this._renderContactItem.bind(this)}
          ]}
          keyExtractor={(item, index) => String(index)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListFooterComponent={this._renderFooter()}
          initialListSize={20}
          pageSize={60}
          showsVerticalScrollIndicator={true}
          stickySectionHeadersEnabled={false}
        />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default CreateGroupScreen;
