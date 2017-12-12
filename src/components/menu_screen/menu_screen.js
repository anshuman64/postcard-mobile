// Library Imports
import React     from 'react';
import RN        from 'react-native';
import Icon      from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon   from 'react-native-vector-icons/Ionicons';

// Local Imports
import { styles }                    from './menu_screen_styles.js';
import { setStateInAnimationFrame }  from '../../utilities/component_utility.js';
import { goBack } from '../../actions/navigation_actions.js';

//--------------------------------------------------------------------//

class MenuScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      isSupportPressed:   false,
      isFeedbackPressed:  false,
      isAboutPressed:     false,
    };
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onPressSupport() {
    RN.Linking.openURL('mailto:support@insiya.io');
  }

  _onPressFeedback() {
    RN.Linking.openURL('mailto:feedback@insiya.io');
  }

  _onPressAbout() {

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderHeader() {
    return (
      <RN.View style={styles.header}>
        <Ionicon name='ios-arrow-round-back' onPress={() => this.props.navigation.dispatch(goBack())} style={styles.backIcon}/>
        <RN.Text style={styles.shareButtonText} onPress={() => this._onPressShare()}>Share</RN.Text>
      </RN.View>
    )
  }

  _renderSupportButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={setStateInAnimationFrame(this, { isSupportPressed: true})}
        onPressOut={setStateInAnimationFrame(this, { isSupportPressed: false})}
        onPress={() => this._onPressSupport()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            name='envelope'
            style={[styles.menuItemIcon, this.state.isSupportPressed && styles.highlight]}
            />
          <RN.Text style={[styles.menuItemText, this.state.isSupportPressed && styles.highlight]}>
            Support
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderFeedbackButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={setStateInAnimationFrame(this, { isFeedbackPressed: true})}
        onPressOut={setStateInAnimationFrame(this, { isFeedbackPressed: false})}
        onPress={() => this._onPressFeedback()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            name='speech'
            style={[styles.menuItemIcon, this.state.isFeedbackPressed && styles.highlight]}
            />
          <RN.Text style={[styles.menuItemText, this.state.isFeedbackPressed && styles.highlight]}>
            Feedback
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  _renderAboutButton() {
    return (
      <RN.TouchableWithoutFeedback
        onPressIn={setStateInAnimationFrame(this, { isAboutPressed: true})}
        onPressOut={setStateInAnimationFrame(this, { isAboutPressed: false})}
        onPress={() => this._onPressAbout()}
        >
        <RN.View style={ styles.menuItemView }>
          <Icon
            name='question'
            style={[styles.menuItemIcon, this.state.isAboutPressed && styles.highlight]}
            />
          <RN.Text style={[styles.menuItemText, this.state.isAboutPressed && styles.highlight]}>
            About
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderHeader()}
        {this._renderSupportButton()}
        {this._renderFeedbackButton()}
        {this._renderAboutButton()}
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
