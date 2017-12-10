// Library Imports
import React                                               from 'react';
import RN from 'react-native';

// Local Imports
import { styles, scaleFactor }  from './login_screen_styles.js';
import CountryListItem          from './country_list_item.js';


//--------------------------------------------------------------------//


class CountryListModal extends React.PureComponent {
  constructor(props) {
    super(props);
    const ds = new RN.ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(countryCodes),
      isTextHighlighted: false,
      isModalMounted: false,
    };
  }

  // Renders the RN.ListView after other modal contents are mounted for performance
  componentDidMount() {
    this.setState({ isModalMounted: true });
  }

  // Scrolls directly to the currently selected country when RN.ListView is opened
  _onListViewContentSizeChange = () => {
    this.listView.scrollTo({x: 0, y: this.props.countryIndex * 17 * scaleFactor - 2, animated: true})
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  // Renders RN.ListView items
  _renderItem = () => {
    return (
      (rowData, sectionID, rowID) => ( <CountryListItem item={rowData} countryIndex={rowID} setCountry={this.props.setCountry} /> )
    )
  }

  render() {
    return(
        <RN.View style={[styles.flex, styles.modalContainer]}>

          {/* Choose Country RN.Text */}
          <RN.View style={[styles.flex, styles.chooseCountryText]}>
            <RN.Text style={[styles.flex, styles.chooseCountryText, styles.text]}>
              Select Country
            </RN.Text>
          </RN.View>

          {/* CountryListView */}
          { this.state.isModalMounted && <RN.ListView
            ref={(ref) => this.listView = ref}
            dataSource={this.state.dataSource}
            style={[styles.container]}
            renderRow={this._renderItem()}
            initialListSize={countryCodes.length}
            onContentSizeChange={this._onListViewContentSizeChange}
          /> }

          {/* CancelButton */}
          <RN.TouchableWithoutFeedback
            onPressIn={this._setStateInAnimationFrame({ isTextHighlighted: true})}
            onPressOut={this._setStateInAnimationFrame({ isTextHighlighted: false})}
            onPress={this.props.setParentState({ isModalVisible: false })}
          >
            <RN.View style={[styles.chooseCountryText]}>
              <RN.Text style={[styles.chooseCountryText, styles.text, this.state.isTextHighlighted && styles.textHighlighted]}>
                Cancel
              </RN.Text>
            </RN.View>
          </RN.TouchableWithoutFeedback>
        </RN.View>
    )
  }
}


//--------------------------------------------------------------------//


export default CountryListModal;
