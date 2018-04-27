// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles } from './section_list_header_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  title (string): title to display
Optional Passed Props:
  highlightedText (string): any text to display in blue
  callback (func): callback when header is pressed
*/
class SectionListHeader extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.TouchableOpacity onPress={this.props.callback} disabled={!this.props.callback}>
        <RN.View style={styles.sectionHeader}>
          <RN.Text style={styles.sectionHeaderText}>
            {this.props.title}
          </RN.Text>
          <Icon name={this.props.iconName} style={styles.icon} />
        </RN.View>
      </RN.TouchableOpacity>
    )
  }
}


//--------------------------------------------------------------------//


export default SectionListHeader;
