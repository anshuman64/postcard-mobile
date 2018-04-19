// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/header/header_container';
import CheckboxListItem          from '../../components/checkbox_list_item/checkbox_list_item';
import { styles }             from './create_circle_screen_styles';
import { UTILITY_STYLES }     from '../../utilities/style_utility';
import { setStateCallback }   from '../../utilities/function_utility';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

/*
Required Screen Props:
  name (string): proposed name of circle
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
      <CheckboxListItem
        userId={rowData}
        recipients={this.state.recipients}
        setParentState={this.setParentState}
        />
    )
  }

  _renderHeader = () => {
    return (
      <CheckboxListItem setParentState={this.setParentState} />
    )
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          createCircleButton={true}
          name={this.props.name}
          recipients={this.state.recipients}
          />
        <RN.ListView
          dataSource={this.ds.cloneWithRows(this.props.friendships.accepted)}
          style={styles.cameraRoll}
          renderRow={this._renderRow}
          initialListSize={20}
          pageSize={60}
          contentContainerStyle={styles.contentContainerStyle}
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

export default CreateCircleScreen;
