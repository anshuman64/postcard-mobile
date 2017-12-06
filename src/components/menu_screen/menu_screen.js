// Library Imports
import React                                              from 'react';
import { View, Text, TouchableWithoutFeedback, Linking }  from 'react-native';
import Icon                                               from 'react-native-vector-icons/SimpleLineIcons';

// Local Imports
import { styles, scaleFactor }  from './menu_screen_styles.js';

//--------------------------------------------------------------------//

class MenuScreen extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        isSupportPressed: false,
        isFeedbackPressed: false,
        isAboutPressed: false,
      };
    }

  _setStateInAnimationFrame = (state) => {
    return(
      () => (requestAnimationFrame(() => {this.setState(state)}))
    )
  }

  _onPressSupport() {
    Linking.openURL('mailto:support@insiya.io');
  }

  _onPressFeedback() {
    Linking.openURL('mailto:feedback@insiya.io');
  }

  _onPressAbout() {

  }

  render() {
    return (
      <View style={[styles.container]}>

        {/* Support */}
        <TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isSupportPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isSupportPressed: false})}
          onPress={() => this._onPressSupport()}
          >
          <View style={[styles.menuItemView]}>
            <Icon
              name='envelope'
              style={[styles.menuItemIcon, this.state.isSupportPressed && styles.highlight]}
              />
            <Text style={[styles.menuItemText, this.state.isSupportPressed && styles.highlight]}>
              Support
            </Text>
          </View>
       </TouchableWithoutFeedback>

       {/* Feedback */}
       <TouchableWithoutFeedback
         onPressIn={this._setStateInAnimationFrame({ isFeedbackPressed: true})}
         onPressOut={this._setStateInAnimationFrame({ isFeedbackPressed: false})}
         onPress={() => this._onPressFeedback()}
         >
         <View style={[styles.menuItemView]}>
           <Icon
             name='speech'
             style={[styles.menuItemIcon, this.state.isFeedbackPressed && styles.highlight]}
             />
           <Text style={[styles.menuItemText, this.state.isFeedbackPressed && styles.highlight]}>
             Feedback
           </Text>
         </View>
      </TouchableWithoutFeedback>

      {/* About */}
      <TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({ isAboutPressed: true})}
        onPressOut={this._setStateInAnimationFrame({ isAboutPressed: false})}
        onPress={() => this._onPressAbout()}
        >
        <View style={[styles.menuItemView]}>
          <Icon
            name='question'
            style={[styles.menuItemIcon, this.state.isAboutPressed && styles.highlight]}
            />
          <Text style={[styles.menuItemText, this.state.isAboutPressed && styles.highlight]}>
            About
          </Text>
        </View>
     </TouchableWithoutFeedback>
     </View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
