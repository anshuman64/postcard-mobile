// Library Imports
import React                                                         from 'react';
import { Platform, View, Text, ListView, TouchableWithoutFeedback }  from 'react-native';

// Local Imports
import { loginScreenStyles, scaleFactor } from './login_screen_styles.js';
import CountryListItem                    from './country_list_item.js';

//--------------------------------------------------------------------//

class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(countryCodes),
      isTextHighlighted: false
    };
  }

  _onListViewContentSizeChange = () => {
    this.listView.scrollTo({x: 0, y: this.props.countryIndex * 17 * scaleFactor - 2, animated: true})
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

  render() {
    return(
        <View style={[loginScreenStyles.flex, loginScreenStyles.modalContainer]}>

          {/* Choose Country Text */}
          <View style={[loginScreenStyles.flex, loginScreenStyles.chooseCountryText]}>
            <Text style={[loginScreenStyles.flex, loginScreenStyles.chooseCountryText, loginScreenStyles.text]}>
              Select Country
            </Text>
          </View>

          {/* CountryListView */}
          <ListView
            ref={(ref) => this.listView = ref}
            dataSource={this.state.dataSource}
            style={[loginScreenStyles.container]}
            renderRow={this._renderItem()}
            initialListSize={countryCodes.length}
            onContentSizeChange={this._onListViewContentSizeChange}
          />

          {/* CancelButton */}
          <TouchableWithoutFeedback
            onPressIn={this._setStateInAnimationFrame({ isTextHighlighted: true})}
            onPressOut={this._setStateInAnimationFrame({ isTextHighlighted: false})}
            onPress={this.props.setParentState({ isModalVisible: false })}
          >
            <View style={[loginScreenStyles.chooseCountryText]}>
              <Text style={[loginScreenStyles.chooseCountryText, loginScreenStyles.text, this.state.isTextHighlighted && loginScreenStyles.textHighlighted]}>
                Cancel
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    )
  }
}

//--------------------------------------------------------------------//

export default CountryListModal;
