// Library Imports
import React  from 'react';
import RN     from 'react-native';

// Local Imports
import { styles }                    from './country_list_modal_styles.js';
import CountryListItem               from './country_list_item.js';
import { scale }                     from '../../utilities/style_utility.js';
import { setStateInAnimationFrame }  from '../../utilities/component_utility.js';
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
    this.setState({ isModalMounted: true });
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  // Scrolls directly to the currently selected country when RN.ListView is opened
  _onListViewContentSizeChange = () => {
    this.listView.scrollTo({x: 0, y: scale(this.props.countryIndex * 17) - 2, animated: true})
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderChooseCountry() {
    return (
      <RN.View style={ styles.chooseCountryView }>
        <RN.Text style={ styles.chooseCountryText }>
          Select Country
        </RN.Text>
      </RN.View>
    )
  }

  // TODO: render spinner
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
    }
  }

  _renderCancelButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={setStateInAnimationFrame(this, { isTextHighlighted: true})}
        onPressOut={setStateInAnimationFrame(this, { isTextHighlighted: false})}
        onPress={this.props.setParentState({ isModalVisible: false })}
      >
        <RN.View style={ styles.chooseCountryView }>
          <RN.Text style={[styles.chooseCountryText, this.state.isTextHighlighted && styles.textHighlighted]}>
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
