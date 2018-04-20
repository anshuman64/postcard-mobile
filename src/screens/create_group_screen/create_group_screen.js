// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/header/header_container';
import CheckboxListItemContainer from '../../components/checkbox_list_item/checkbox_list_item_container';
import { styles }             from './create_group_screen_styles';
import { UTILITY_STYLES }     from '../../utilities/style_utility';
import { setStateCallback }   from '../../utilities/function_utility';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

/*
Required Screen Props:
  isCircle (bool): true = is circle, false = is group
  circleName (string): proposed circleName of circle
*/
class CreateGroupScreen extends React.PureComponent {

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

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          createGroupButton={!this.props.isCircle}
          recipients={this.state.recipients}
          />
        <RN.ListView
          dataSource={this.ds.cloneWithRows(this.props.friendships.accepted)}
          renderRow={this._renderRow}
          initialListSize={20}
          pageSize={60}
          enableEmptySections={true}
          showsVerticalScrollIndicator={true}
          onEndReached={this._onEndReached}
          renderFooter={this._renderFooter}
          />
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default CreateGroupScreen;
