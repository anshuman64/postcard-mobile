// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles }                    from './country_list_item_styles.js';


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
          this.countryText.setNativeProps({style: styles.countryListText})
          this.dialingCodeText.setNativeProps({style: styles.countryListText})
        }}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <RN.View style={[styles.countryListItems]}>
          <RN.Text ref={(ref) => this.countryText = ref} style={styles.countryListText}>
            {this.props.item.country_name}
          </RN.Text>
          <RN.Text ref={(ref) => this.dialingCodeText = ref} style={styles.countryListText}>
            {this.props.item.dialing_code}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListItem;
