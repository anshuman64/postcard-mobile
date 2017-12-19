// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles }                    from './country_list_modal_styles.js';
import CountryListItem               from './country_list_item.js';
import { COLORS, deviceHeight }              from '../../utilities/style_utility.js';
import { setStateInAnimationFrame }  from '../../utilities/function_utility.js';
import { COUNTRY_CODES }             from '../../utilities/country_utility.js';


//--------------------------------------------------------------------//


class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource:         ds.cloneWithRows(COUNTRY_CODES),
      isTextHighlighted:  false,
      isModalMounted:     false,
    };
  }

  //--------------------------------------------------------------------//
  // Lifecycle Methods
  //--------------------------------------------------------------------//

  // Renders the RN.ListView after other modal contents are mounted for performance
  componentDidMount() {
    setInterval(() => this.setState({ isModalMounted: true }), 1);
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Scrolls directly to the currently selected country when RN.ListView is opened
  _onListViewContentSizeChange = () => {
    let countryPosition = this.props.countryIndex * 45 - 2; // countryIndex * height of each bar minus aesthetic two pixels
    let maxPosition = COUNTRY_CODES.length * 45 - (0.85 * deviceHeight - 50 - 45); // length of full list minus length of one page of listView
    this.listView.scrollTo({x: 0, y: Math.min(countryPosition, maxPosition), animated: true})
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

  _renderCountryListView() {
    if(this.state.isModalMounted) {
      return (
        <RN.ListView
          ref={(ref) => this.listView = ref}
          dataSource={this.state.dataSource}
          style={ styles.countryListView }
          renderRow={this._renderItem()}
          initialListSize={COUNTRY_CODES.length}
          onContentSizeChange={this._onListViewContentSizeChange}
        />
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
        onPressIn={setStateInAnimationFrame(this, { isTextHighlighted: true})}
        onPressOut={setStateInAnimationFrame(this, { isTextHighlighted: false})}
        onPress={this.props.setParentState({ isModalVisible: false })}
      >
        <RN.View style={ styles.cancelButtonView }>
          <RN.Text style={[styles.cancelButtonText, this.state.isTextHighlighted && styles.textHighlighted]}>
            Cancel
          </RN.Text>
        </RN.View>
      </RN.TouchableWithoutFeedback>
    )
  }

  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

  render() {
    return(
      <RN.View style={ styles.container }>
        {this._renderChooseCountry()}
        {this._renderCountryListView()}
        {this._renderCancelButton()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListModal;
