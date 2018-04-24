// Library Imports
import React           from 'react';
import RN              from 'react-native';

// Local Imports
import HeaderContainer               from '../../components/header/header_container';
import CheckboxListItemContainer     from '../../components/checkbox_list_item/checkbox_list_item_container';
import ListFooter                    from '../../components/list_footer/list_footer';
import { UTILITY_STYLES, scaleFont } from '../../utilities/style_utility';

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
      recipients: [],
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

  _renderRow = (rowData, sectionID, rowID) => {
    return (
      <CheckboxListItemContainer
        convoId={rowData}
        recipients={this.state.recipients}
        setParentState={this.setParentState}
        />
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
        <RN.ListView
          dataSource={this.ds.cloneWithRows(this.props.conversations)}
          renderRow={this._renderRow}
          initialListSize={20}
          pageSize={60}
          showsVerticalScrollIndicator={true}
          onEndReached={this._onEndReached}
          renderFooter={this._renderFooter}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default CreateCircleScreen;
