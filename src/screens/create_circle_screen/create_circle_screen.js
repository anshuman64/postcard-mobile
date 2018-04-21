// Library Imports
import React           from 'react';
import RN              from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon            from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import HeaderContainer        from '../../components/header/header_container';
import CheckboxListItemContainer from '../../components/checkbox_list_item/checkbox_list_item_container';
import { styles }             from './create_circle_screen_styles';
import { UTILITY_STYLES }     from '../../utilities/style_utility';
import { setStateCallback }   from '../../utilities/function_utility';

//--------------------------------------------------------------------//

const AnimatedIcon = Animatable.createAnimatableComponent(Icon);

/*
Required Screen Props:
*/
/*
Required Screen Props:
  circleName (string): proposed circleName of circle
  recipients (array): array of ids to add to circle
  postText (string): preserve data from ShareScreen to pass to HeaderContainer
  placeholderText (string): preserve data from ShareScreen to pass to HeaderContainer
  imagePath (string): preserve data from ShareScreen to pass to HeaderContainer
  imageType (string): preserve data from ShareScreen to pass to HeaderContainer
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

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerStart}>
        <HeaderContainer
          backIcon={true}
          backTitle={'Select Friends'}
          createCircleButton={true}
          circleName={this.props.circleName}
          recipients={this.state.recipients}
          postText={this.props.postText}
          placeholderText={this.props.placeholderText}
          imagePath={this.props.imagePath}
          imageType={this.props.imageType}
          />
        <RN.ListView
          dataSource={this.ds.cloneWithRows(this.props.conversations)}
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

export default CreateCircleScreen;
