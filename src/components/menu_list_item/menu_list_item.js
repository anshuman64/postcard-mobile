// Library Imports
import React  from 'react';
import RN     from 'react-native';
import Icon   from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }         from './menu_list_item_styles';
import { UTILITY_STYLES } from '../../utilities/style_utility';

//--------------------------------------------------------------------//

/*
Required Passed Props:
  callback (func): function when button is pressed
  iconName (string): name of icon from SimpleLineIcons directory
  text (string): text to display
Optional Passed Props:
  -
*/
class MenuListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.iconRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.textRef.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.iconRef.setNativeProps({style: styles.menuItemIcon})
          this.textRef.setNativeProps({style: styles.menuItemText})
        }}
        onPress={this.props.callback}
        >
        <RN.View style={styles.menuItemView}>
          <Icon
            ref={(ref) => this.iconRef = ref}
            name={this.props.iconName}
            style={styles.menuItemIcon}
            />
          <RN.Text allowFontScaling={false} numberOfLines={1} ref={(ref) => this.textRef = ref} style={styles.menuItemText}>
            {this.props.text}
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default MenuListItem;
