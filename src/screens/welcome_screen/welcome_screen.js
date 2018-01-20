// Library Imports
import React            from 'react';
import RN               from 'react-native';
import * as Animatable  from 'react-native-animatable';

// Local Imports
import { styles, fadeInIcon, translateIcon, translateLogo } from './welcome_screen_styles.js';
import { UTILITY_STYLES }                                   from '../../utilities/style_utility.js';
import { setStateCallback }                                 from '../../utilities/function_utility.js';

//--------------------------------------------------------------------//


class WelcomeScreen extends React.PureComponent {

  //--------------------------------------------------------------------//
  // Constructor
  //--------------------------------------------------------------------//

  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  //--------------------------------------------------------------------//
  // Animation Render Methods
  //--------------------------------------------------------------------//

  //TODO: Don't allow icon & logo to push up with keyboard
  _renderIconAnimation() {
    if (this.state.isLogoFading) {
      return (
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode='cover'
          animation={fadeInIcon}
          duration={20}
          delay={10}
          />
      )
    } else {
      return (
        <Animatable.Image
          style={styles.icon}
          source={require('../../assets/images/icon/icon.png')}
          resizeMode='cover'
          animation={translateIcon}
          duration={20}
          />
      )
    }
  }

  _renderLogoAnimation() {
    if (this.state.isLogoFading) {
      return (
        <Animatable.Text
          style={styles.logo}
          animation={'fadeIn'}
          duration={18}
          delay={30}
          onAnimationEnd={setStateCallback(this, { isLogoFading: false })}
          >
          Insiya
        </Animatable.Text>
      )
    } else {
      return (
        <Animatable.Text
          style={styles.logo}
          animation={translateLogo}
          duration={20}
          >
          Insiya
        </Animatable.Text>
      )
    }
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderFilledCheckbox() {
    if (this.state.isChecked) {
      return (
        <Animatable.View
          style={styles.checkboxFilled}
          animation={'zoomIn'}
          duration={50}
          />
      )
    } else {
      return null;
    }
  }

  _renderCheckbox() {
    return (
      <RN.View style={styles.checkboxView}>
        <RN.TouchableWithoutFeedback
          onPressIn={() => this.checkbox.setNativeProps({style: UTILITY_STYLES.borderHighlighted})}
          onPressOut={() => this.checkbox.setNativeProps({style: styles.checkbox})}
          onPress={setStateCallback(this, { isChecked: !this.state.isChecked })}
          >
          <RN.View ref={(ref) => this.checkbox = ref} style={[styles.checkbox, this.state.isChecked && UTILITY_STYLES.borderHighlighted]}>
            {this._renderFilledCheckbox()}
          </RN.View>
        </RN.TouchableWithoutFeedback>
        <RN.Text style={styles.checkboxText}>
          I agree to the
            <RN.Text style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/terms-of-use-de17e7b76742')}> Terms of Use</RN.Text>
          ,
            <RN.Text style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/privacy-policy-a18b33e9d916')}> Privacy Policy</RN.Text>
          , and
            <RN.Text style={UTILITY_STYLES.textHighlighted} onPress={() => RN.Linking.openURL('https://medium.com/@InsiyaInc/community-guidelines-598b3fd77a2e')}> Community Guidelines</RN.Text>
        </RN.Text>
      </RN.View>
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableOpacity
        style={[UTILITY_STYLES.nextButtonBackground, {marginTop: 30}, !this.state.isChecked && UTILITY_STYLES.nextButtonBackgroundDisabled]}
        onPress={() => this.props.navigateTo('LoginScreen')}
        disabled={!this.state.isChecked}
        >
        <RN.Text style={[UTILITY_STYLES.lightWhiteText18, !this.state.isChecked && UTILITY_STYLES.nextButtonTextDisabled]}>
          Next
        </RN.Text>
      </RN.TouchableOpacity>
    )
  }

  _renderWelcomeScreen() {
    if (!this.state.isLogoFading) {
      return (
        <Animatable.View
          style={styles.animatableView}
          animation={'fadeIn'}
          duration={20}
          delay={6}
          >
          {this._renderCheckbox()}
          {this._renderNextButton()}
        </Animatable.View>
      )
    }
  }

  render() {
    return (
      <RN.View style={UTILITY_STYLES.containerCenter}>
        {this._renderIconAnimation()}
        {this._renderLogoAnimation()}
        {this._renderWelcomeScreen()}
      </RN.View>
    )
  }
}


//--------------------------------------------------------------------//

export default WelcomeScreen;