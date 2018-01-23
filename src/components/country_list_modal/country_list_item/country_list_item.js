// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles }         from './country_list_item_styles.js';
import { UTILITY_STYLES } from '../../../utilities/style_utility.js';


//--------------------------------------------------------------------//


class CountryListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.countryText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
          this.dialingCodeText.setNativeProps({style: UTILITY_STYLES.textHighlighted})
        }}
        onPressOut={() => {
          this.countryText.setNativeProps({style: UTILITY_STYLES.lightBlackText15})
          this.dialingCodeText.setNativeProps({style: UTILITY_STYLES.lightBlackText15})
        }}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <RN.View style={styles.rowContainer}>
          <RN.Text ref={(ref) => this.countryText = ref} style={UTILITY_STYLES.lightBlackText15}>
            {this.props.item.country_name}
          </RN.Text>
          <RN.Text ref={(ref) => this.dialingCodeText = ref} style={UTILITY_STYLES.lightBlackText15}>
            {this.props.item.dialing_code}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListItem;
