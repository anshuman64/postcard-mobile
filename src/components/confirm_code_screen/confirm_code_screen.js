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
      inputtedCode: '',
      isCodeInputFocused: '',
    };
  }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _codeInputOnChangeText(value) {
    if (value.length === 6) {

    }
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
          style={[styles.codeInput, this.state.isCodeInputFocused && styles.borderHighlighted]}
          keyboardType='numeric'
          onChangeText={(value) => this.setState({inputtedCode: value})}
          value={this.state.inputtedCode}
          placeholder='-  -  -  -  -  -'
          autoFocus={true}
          maxLength={6}
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
