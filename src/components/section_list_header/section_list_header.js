// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles } from './section_list_header_styles';
import { UTILITY_STYLES, COLORS } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  title (string): title to display
Optional Passed Props:
  highlightedText (string): any text to display in blue
  iconName (string): name of SimpleLineIcon to display
  searchText (string): inputted text in searchBar
  setParentState (func): to update searchText on screen
  callback (func): callback when header is pressed
*/
class SectionListHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderSearchBar() {
    return (
      <RN.TextInput
        ref={(ref) => this.textInput = ref}
        style={styles.textInput}
        onChangeText={(value) => this.props.setParentState({ searchText: value })}
        value={this.props.searchText}
        placeholder={'Search...'}
        autoCapitalize={'words'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        />
    )
  }

  render() {
    return(
      <RN.TouchableOpacity onPress={this.props.callback} disabled={!this.props.callback}>
        <RN.View style={styles.sectionHeader}>
          <RN.Text style={styles.sectionHeaderText}>
            {this.props.title}
          </RN.Text>
          {this.props.iconName ? <Icon name={this.props.iconName} style={styles.icon} /> : null}
          {this.props.title === 'Other Contacts' ? this._renderSearchBar() : null}
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//


export default SectionListHeader;
