// Library Imports
import React from 'react';
import RN    from 'react-native';
import Icon  from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles }                              from './list_footer_styles.js';
import { UTILITY_STYLES, getUsableDimensions } from '../../utilities/style_utility.js';

//--------------------------------------------------------------------//

class ListFooter extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderButton(screen, iconName, isCenter) {
    return (
      <RN.TouchableOpacity onPress={() => this.props.navigateTo(screen)} style={styles.button}>
        <Icon name={iconName} style={[styles.icon, isCenter && styles.iconBig, this.props.currentScreen === screen && UTILITY_STYLES.textHighlighted]} />
      </RN.TouchableOpacity>
    )
  }

  render() {
    let lineWidth = (getUsableDimensions().width - this.props.footerWidth) / 2 - 20;

    return (
      <RN.View style={styles.footerView}>
        <RN.View style={[styles.horizontalLine, {width: lineWidth}]} />
        <RN.Text style={[styles.footerText, {width: this.props.footerWidth}]}>
          {this.props.text}
          <RN.Text style={[styles.footerText, UTILITY_STYLES.textHighlighted, {width: this.props.footerWidth}]}>
            {this.props.highlightedText}
          </RN.Text>
        </RN.Text>
        <RN.View style={[styles.horizontalLine, {width: lineWidth}]} />
      </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default ListFooter;
