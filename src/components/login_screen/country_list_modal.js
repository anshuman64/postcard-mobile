// Library Imports
import React                                               from 'react';
import { View, Text, ListView, TouchableWithoutFeedback }  from 'react-native';

// Local Imports
import { styles }       from './login_screen_styles.js';
import CountryListItem  from './country_list_item.js';
import { scale }        from '../../utilities/style_utility.js';


//--------------------------------------------------------------------//


class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(countryCodes),
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

  // Renders ListView items
  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

  render() {
    return(
        <View style={ styles.container }>

          {/* Choose Country Text */}
          <View style={ styles.chooseCountryView }>
            <Text style={ styles.chooseCountryText }>
              Select Country
            </Text>
          </View>

          {/* CountryListView */}
          { this.state.isModalMounted && <ListView
            ref={(ref) => this.listView = ref}
            dataSource={this.state.dataSource}
            style={ styles.container }
            renderRow={this._renderItem()}
            initialListSize={countryCodes.length}
            onContentSizeChange={this._onListViewContentSizeChange}
          /> }

          {/* CancelButton */}
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
        </View>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListModal;
