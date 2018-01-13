// Library Imports
import React  from 'react';
import RN     from 'react-native';
import _      from 'lodash';

// Local Imports
import { styles }                                        from './country_list_modal_styles.js';
import CountryListItem                                   from './country_list_item/country_list_item.js';
import { COLORS, DEVICE_DIM, MAX_TABLET_DIM, isTablet }  from '../../utilities/style_utility.js';
import { COUNTRY_CODES }                                 from '../../utilities/country_utility.js';


//--------------------------------------------------------------------//


class CountryListModal extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//
  
  constructor(props) {
    super(props);
    const ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:         ds.cloneWithRows(COUNTRY_CODES),
      isModalMounted:     false,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Renders the RN.ScrollView after other modal contents are mounted for performance
  componentDidMount() {
    setTimeout(() => this.setState({ isModalMounted: true }), 1);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Scrolls directly to the currently selected country when RN.ScrollView is opened
  _onListViewContentSizeChange = () => {
    let height = isTablet() ? 0.9 * MAX_TABLET_DIM.height : 0.85 * DEVICE_DIM.height;
    let countryPosition = this.props.countryIndex * 45 - 2; // countryIndex * height of each bar minus aesthetic two pixels
    let maxPosition = COUNTRY_CODES.length * 45 - (height - 50 - 45); // length of full list minus length of one page of scrollView
    this.scrollView.scrollTo({x: 0, y: Math.min(countryPosition, maxPosition), animated: true})
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderChooseCountry() {
    return (
      <RN.View style={ styles.selectCountryView }>
        <RN.Text style={ styles.selectCountryText }>
          Select Country
        </RN.Text>
      </RN.View>
    )
  }

  _renderCountryScrollView() {
    if(this.state.isModalMounted) {
      return (
        <RN.ScrollView
          ref={(ref) => this.scrollView = ref}
          style={ styles.countryListView }
          onContentSizeChange={this._onListViewContentSizeChange}
          >
          {this._renderItem()}
        </RN.ScrollView>
      )
    } else {
      return (
        <RN.ActivityIndicator size='small' color={COLORS.grey400}  />
      )
    }
  }

  _renderCancelButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={() => this.cancelButtonText.setNativeProps({style: styles.textHighlighted})}
        onPressOut={() => this.cancelButtonText.setNativeProps({style: styles.cancelButtonText})}
        onPress={this.props.setParentState({ isModalVisible: false })}
      >
        <RN.View style={ styles.cancelButtonView }>
          <RN.Text ref={(ref) => this.cancelButtonText = ref} style={ styles.cancelButtonText }>
            Cancel
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderItem = () => {
    let rows = [];

    for (i = 0; i < COUNTRY_CODES.length; i++) {
      rows.push(
        <CountryListItem key={i} item={COUNTRY_CODES[i]} countryIndex={i} setCountry={this.props.setCountry} />
      )
    }

    return rows;
  }

  render() {
    return(
      <RN.View style={ styles.container }>
        {this._renderChooseCountry()}
        {this._renderCountryScrollView()}
        {this._renderCancelButton()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListModal;
