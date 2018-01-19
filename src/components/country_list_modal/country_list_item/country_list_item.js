// Library Imports
import React from 'react';
import RN    from 'react-native';

// Local Imports
import { styles } from './country_list_item_styles.js';


//--------------------------------------------------------------------//


class CountryListItem extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render() {
    return(
      <RN.TouchableWithoutFeedback
        onPressIn={() => {
          this.countryText.setNativeProps({style: styles.textHighlighted})
          this.dialingCodeText.setNativeProps({style: styles.textHighlighted})
        }}
        onPressOut={() => {
          this.countryText.setNativeProps({style: styles.rowText})
          this.dialingCodeText.setNativeProps({style: styles.rowText})
        }}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <RN.View style={styles.rowContainer}>
          <RN.Text ref={(ref) => this.countryText = ref} style={styles.rowText}>
            {this.props.item.country_name}
          </RN.Text>
          <RN.Text ref={(ref) => this.dialingCodeText = ref} style={styles.rowText}>
            {this.props.item.dialing_code}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListItem;
