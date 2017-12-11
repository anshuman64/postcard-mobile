// Library Imports
import React                                    from 'react';
import { View, Text, TouchableWithoutFeedback}  from 'react-native';

// Local Imports
import { styles } from './country_list_item_styles.js';


//--------------------------------------------------------------------//


class CountryListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isTextHighlighted: false
    };
  }
  // TODO: make into utility method
  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  render() {
    return(
      <TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({isTextHighlighted: true})}
        onPressOut={this._setStateInAnimationFrame({isTextHighlighted: false})}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <View style={[styles.countryListItems]}>
          <Text style={[styles.countryListText, this.state.isTextHighlighted && styles.textHighlighted]}>
            {this.props.item.country_name}
          </Text>
          <Text style={[styles.countryListText, this.state.isTextHighlighted && styles.textHighlighted]}>
            {this.props.item.dialing_code}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListItem;
