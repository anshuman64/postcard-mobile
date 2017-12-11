// Library Imports
import React                                               from 'react';
import { View, Text, ListView, TouchableWithoutFeedback }  from 'react-native';

// Local Imports
import { styles }         from './country_list_modal_styles.js';
import CountryListItem    from './country_list_item.js';
import { scale }          from '../../utilities/style_utility.js';
import { COUNTRY_CODES }  from '../../utilities/country_utility.js';


//--------------------------------------------------------------------//


class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(COUNTRY_CODES),
      isTextHighlighted: false,
      isModalMounted: false,
    };
  }

  // Renders the ListView after other modal contents are mounted for performance
  componentDidMount() {
    this.setState({ isModalMounted: true });
  }

  // Scrolls directly to the currently selected country when ListView is opened
  _onListViewContentSizeChange = () => {
    this.listView.scrollTo({x: 0, y: scale(this.props.countryIndex * 17) - 2, animated: true})
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderChooseCountry() {
    return (
      <View style={ styles.chooseCountryView }>
        <Text style={ styles.chooseCountryText }>
          Select Country
        </Text>
      </View>
    )
  }

  // TODO: render spinner
  _renderCountryListView() {
    if(this.state.isModalMounted) {
      return (
        <ListView
          ref={(ref) => this.listView = ref}
          dataSource={this.state.dataSource}
          style={ styles.countryListView }
          renderRow={this._renderItem()}
          initialListSize={COUNTRY_CODES.length}
          onContentSizeChange={this._onListViewContentSizeChange}
        />
      )
    }
  }

  _renderCancelButton() {
    return (
      <TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({ isTextHighlighted: true})}
        onPressOut={this._setStateInAnimationFrame({ isTextHighlighted: false})}
        onPress={this.props.setParentState({ isModalVisible: false })}
      >
        <View style={ styles.chooseCountryView }>
          <Text style={[styles.chooseCountryText, this.state.isTextHighlighted && styles.textHighlighted]}>
            Cancel
          </Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

  render() {
    return(
      <View style={ styles.container }>
        {this._renderChooseCountry()}
        {this._renderCountryListView()}
        {this._renderCancelButton()}
      </View>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListModal;
