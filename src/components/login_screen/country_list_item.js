// Library Imports
import React  from 'react';
import RN     from 'react-native';

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
      <RN.TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({isTextHighlighted: true})}
        onPressOut={this._setStateInAnimationFrame({isTextHighlighted: false})}
        onPress={this.props.setCountry(this.props.countryIndex)}
        >
        <RN.View style={[styles.countryListItems]}>
          <RN.Text style={[styles.countryListText, this.state.isTextHighlighted && styles.textHighlighted]}>
            {this.props.item.country_name}
          </RN.Text>
          <RN.Text style={[styles.countryListText, this.state.isTextHighlighted && styles.textHighlighted]}>
            {this.props.item.dialing_code}
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListItem;
