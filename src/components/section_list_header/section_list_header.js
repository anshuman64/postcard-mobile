// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';
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
  contactSearchText (string): inputted text in searchBar for contacts
  convoSearchText (string): inputted text in searchBar for convos
  setParentState (func): to update contactSearchText on screen
  callback (func): callback when header is pressed
*/
class SectionListHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Private Methods
  //--------------------------------------------------------------------//

  _setParentState = (value) => {
    if (this.props.title === 'Other Contacts') {
      this.props.setParentState({ contactSearchText: value });
    } else {
      this.props.setParentState({ convoSearchText: value });
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderSearchBar() {
    isContact = this.props.title === 'Other Contacts';

    return (
      <RN.TextInput
        allowFontScaling={false}
        ref={(ref) => this.textInput = ref}
        style={styles.textInput}
        onChangeText={this._setParentState.bind(this)}
        value={this.props.title === 'Other Contacts' ? this.props.contactSearchText : this.props.convoSearchText}
        placeholder={'Search...'}
        autoCapitalize={'none'}
        returnKeyType={RN.Platform.OS === 'ios' ? 'done' : null}
        placeholderTextColor={COLORS.grey400}
        underlineColorAndroid={'transparent'}
        />
    )
  }

  render() {
    let isSearchBar = this.props.title === 'Other Contacts' || this.props.title === 'Conversations' || this.props.title === 'Friends' || this.props.title === 'Groups & Friends';

    return(
      <RN.TouchableOpacity onPress={this.props.callback} disabled={!this.props.callback}>
        <RN.View style={styles.sectionHeader}>
          <RN.Text allowFontScaling={false} style={styles.sectionHeaderText}>
            {this.props.title}
          </RN.Text>
          {this.props.iconName ? <Icon name={this.props.iconName} style={styles.icon} /> : null}
          {isSearchBar ? this._renderSearchBar() : null}
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//


export default SectionListHeader;
