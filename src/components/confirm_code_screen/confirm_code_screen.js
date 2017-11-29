// Library Imports
import React                                from 'react';
import { Button, StyleSheet, Text, View, TextInput, TouchableWithoutFeedback }   from 'react-native';
import { connect }                          from 'react-redux';

// Local Imports
import { styles, scaleFactor }  from './confirm_code_screen_styles.js';
import { toPostsScreen }        from '../../actions/navigation_actions.js';


//--------------------------------------------------------------------//

class ConfirmCodeScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '+14083060059',
      confirmationCode: '',
      inputtedCode: '',
      isCodeInputFocused: '',
    };
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.container]}>

        {/* Header */}
        <View style={[styles.headerView]}>
          <Text style={[styles.backText]}>
            Back
          </Text>
          <Text style={[styles.headerTitleText]}>
            Confirm Code
          </Text>
        </View>

        <View style={{flex: 3}} />

        {/* Top Text */}
        <Text style={[styles.titleText]}>
          Enter Confirmation Code
        </Text>
        <Text style={[styles.subtitleText]}>
          Sent to {this.state.phoneNumber}
        </Text>


        <View style={{flex: 1.5}} />

        {/* Code Input */}
        <TextInput
          style={[styles.codeInput]}
          keyboardType='numeric'
          onChangeText={(value) => this.setState({inputtedCode: value})}
          value={this.state.inputtedCode}
          placeholder='-  -  -  -  -  -'
          placeholderTextColor='#bdbdbd'
          underlineColorAndroid={'transparent'}
          onFocus={this._setStateInAnimationFrame({ isCodeInputFocused: true})}
          onEndEditing={this._setStateInAnimationFrame({ isCodeInputFocused: false})}
        />


        <View style={{flex: 3}} />

        {/* Resend SMS */}
        <TouchableWithoutFeedback
          >
          <View style={[styles.resendSMSView]}>
            <Text style={[styles.subtitleText, styles.resendSMSText]}>
              Resend SMS
            </Text>
            <Text style={[styles.subtitleText, styles.resendSMSText]}>
              00:59
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View style={{flex: 18}} />
      </View>
    )
  }
}


//--------------------------------------------------------------------//


export default ConfirmCodeScreen;



// <TextInput
//   style={[]}
//   keyboardType='numeric'
//   onChangeText={(value) => this._onPhoneInputChangeText(value)}
//   value={this.state.formattedPhoneNumber}
//   placeholder='Phone Number'
//   placeholderTextColor='#bdbdbd'
//   underlineColorAndroid={'transparent'}
//   onFocus={this._setStateInAnimationFrame({ isPhoneInputFocused: true})}
//   onEndEditing={this._setStateInAnimationFrame({ isPhoneInputFocused: false})}
// />
//
// {/* Resend SMS */}
// <TouchableWithoutFeedback
//   onPressIn={this._setStateInAnimationFrame({isTextHighlighted: true})}
//   onPressOut={this._setStateInAnimationFrame({isTextHighlighted: false})}
//   onPress={this.props.setCountry(this.props.countryIndex)}
//   >
//   <View style={[]}>
//     <Text style={[]}>
//       {this.props.item.country_name}
//     </Text>
//     <Text style={[]}>
//       {this.props.item.dialing_code}
//     </Text>
//   </View>
// </TouchableWithoutFeedback>
