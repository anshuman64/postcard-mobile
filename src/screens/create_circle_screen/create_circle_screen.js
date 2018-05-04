// Library Imports
import React           from 'react';
import RN              from 'react-native';

// Local Imports
import HeaderContainer               from '../../components/header/header_container';
import SectionListHeader             from '../../components/section_list_header/section_list_header';
import CheckboxListItemContainer     from '../../components/checkbox_list_item/checkbox_list_item_container';
import ListFooter                    from '../../components/list_footer/list_footer';
import { UTILITY_STYLES, scaleFont } from '../../utilities/style_utility';
import { isConvoSearched }           from '../../utilities/entity_utility';

//--------------------------------------------------------------------//

/*
Required Screen Props:
*/
/*
Required Screen Props:
  circleName (string): proposed circleName of circle
  recipients (array): array of ids to add to circle
Optional Screen Props:
  -
*/
class CreateCircleScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      recipients:      [],
      convoSearchText: '',
    };

    this.ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  }

  //--------------------------------------------------------------------//
  // Public Methods
  //--------------------------------------------------------------------//

  // Passed to CheckboxListItem for updating state
  setParentState = (state) => {
    this.setState(state);
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

  _renderSectionHeader = ({section}) => {
    return (
      <SectionListHeader title={section.title} convoSearchText={this.state.convoSearchText} setParentState={this.setParentState}/>
    )
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
          createCircleButton={true}
          circleName={this.props.circleName}
          recipients={this.state.recipients}
          />
        <RN.SectionList
          sections={[{data: this.props.conversations.filter((x) => isConvoSearched(x, this.state.convoSearchText, this.props.usersCache, this.props.groupsCache, this.props.contactsCache)).slice(0, 250), renderItem: this._renderConvoItem.bind(this), title: 'Groups & Friends'}]}
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

export default CreateCircleScreen;
