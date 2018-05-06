// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import HeaderContainer                        from '../../components/header/header_container';
import CheckboxListItemContainer              from '../../components/checkbox_list_item/checkbox_list_item_container';
import SectionListHeader                      from '../../components/section_list_header/section_list_header';
import ListFooter                             from '../../components/list_footer/list_footer';
import { UTILITY_STYLES, scaleFont }          from '../../utilities/style_utility';
import { isConvoSearched, isContactSearched } from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
  placeholderText (string): placeholder text of NewPostScreen to send to analytics
Optional Screen Props:
  postText (string): text of the post to be shared, coming from NewPostScreen and/or CreateCircleScreen
  media (array of photos and videos): array of photos and videos from ImagePicker from NewPostScreen
  postId (int): if forwarding a post, id of post
*/
class ShareScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      circles:           [],
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

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  onPressAddCircle = () => {
    this.props.navigateTo('NameCircleScreen', { screen: 'NameCircleScreen' });
  }

  onPressOtherContactsHelp = () => {
    RN.Alert.alert('', "Invite your contacts to join Postcard. Your friend request, messages, and posts will be waiting for them when they log in!", [{text: 'OK', style: 'cancel'}]);
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderConvoItem = ({item}) => {
    return (
      <CheckboxListItemContainer
        convoId={item}
        recipients={this.state.recipients}
        setParentState={this.setParentState}
        />
    )
  }

  _renderCircleItem = ({item}) => {
    return (
      <CheckboxListItemContainer
        circle={item}
        recipients={this.state.recipients}
        circles={this.state.circles}
        setParentState={this.setParentState}
        />
    )
  }

  _renderContactItem = ({item}) => {
    return (
      <CheckboxListItemContainer
        phoneNumber={item}
        contactRecipients={this.state.contactRecipients}
        setParentState={this.setParentState}
        />
    )
  }

  _renderSectionHeader = ({section}) => {
    if (section.title === 'Circles') {
      return (
        <SectionListHeader title={section.title} iconName={'plus'} callback={this.onPressAddCircle} />
      )
    } else if (section.title === 'Other Contacts') {
      return (
        <SectionListHeader title={section.title} iconName={'question'} callback={this.onPressOtherContactsHelp} contactSearchText={this.state.contactSearchText} setParentState={this.setParentState}/>
      )
    } else if (section.title) {
      return (
        <SectionListHeader title={section.title} convoSearchText={this.props.convoSearchText} setParentState={this.setParentState}/>
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
          shareButton={true}
          postText={this.props.postText}
          placeholderText={this.props.placeholderText}
          media={this.props.media}
          recipients={this.state.recipients}
          contactRecipients={this.state.contactRecipients}
          postId={this.props.postId}
          />
        <RN.SectionList
          sections={[
            {data: this.props.circles, renderItem: this._renderCircleItem.bind(this), title: 'Circles'},
            {data: this.props.conversations.filter((x) => isConvoSearched(x, this.state.convoSearchText, this.props.usersCache, this.props.groupsCache, this.props.contactsCache)).slice(0, 250), renderItem: this._renderConvoItem.bind(this), title: 'Groups & Friends'},
            {data: this.props.contacts.phoneNumbersWithAccounts.filter((x) => isContactSearched(x, this.state.contactSearchText, this.props.contactsCache)).slice(0, 250), renderItem: this._renderContactItem.bind(this), title: 'Other Contacts'},
            {data: this.props.contacts.phoneNumbersWithoutAccounts.filter((x) => isContactSearched(x, this.state.contactSearchText, this.props.contactsCache)).slice(0, 250), renderItem: this._renderContactItem.bind(this)}
          ]}
          keyExtractor={(item, index) => String(index)}
          renderSectionHeader={this._renderSectionHeader.bind(this)}
          ListFooterComponent={this._renderFooter()}
          initialListSize={20}
          pageSize={20}
          onEndReachedThreshold={0.1}
          showsVerticalScrollIndicator={true}
          stickySectionHeadersEnabled={false}
        />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default ShareScreen;
