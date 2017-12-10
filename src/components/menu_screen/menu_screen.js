// Library Imports
import React                                              from 'react';
import * as RN from 'react-native';
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
    RN.Linking.openURL('mailto:support@insiya.io');
  }

  _onPressFeedback() {
    RN.Linking.openURL('mailto:feedback@insiya.io');
  }

  _onPressAbout() {

  }

  render() {
    return (
      <RN.View style={[styles.container]}>

        {/* Support */}
        <RN.TouchableWithoutFeedback
          onPressIn={this._setStateInAnimationFrame({ isSupportPressed: true})}
          onPressOut={this._setStateInAnimationFrame({ isSupportPressed: false})}
          onPress={() => this._onPressSupport()}
          >
          <RN.View style={[styles.menuItemView]}>
            <Icon
              name='envelope'
              style={[styles.menuItemIcon, this.state.isSupportPressed && styles.highlight]}
              />
            <RN.Text style={[styles.menuItemText, this.state.isSupportPressed && styles.highlight]}>
              Support
            </RN.Text>
          </RN.View>
       </RN.TouchableWithoutFeedback>

       {/* Feedback */}
       <RN.TouchableWithoutFeedback
         onPressIn={this._setStateInAnimationFrame({ isFeedbackPressed: true})}
         onPressOut={this._setStateInAnimationFrame({ isFeedbackPressed: false})}
         onPress={() => this._onPressFeedback()}
         >
         <RN.View style={[styles.menuItemView]}>
           <Icon
             name='speech'
             style={[styles.menuItemIcon, this.state.isFeedbackPressed && styles.highlight]}
             />
           <RN.Text style={[styles.menuItemText, this.state.isFeedbackPressed && styles.highlight]}>
             Feedback
           </RN.Text>
         </RN.View>
      </RN.TouchableWithoutFeedback>

      {/* About */}
      <RN.TouchableWithoutFeedback
        onPressIn={this._setStateInAnimationFrame({ isAboutPressed: true})}
        onPressOut={this._setStateInAnimationFrame({ isAboutPressed: false})}
        onPress={() => this._onPressAbout()}
        >
        <RN.View style={[styles.menuItemView]}>
          <Icon
            name='question'
            style={[styles.menuItemIcon, this.state.isAboutPressed && styles.highlight]}
            />
          <RN.Text style={[styles.menuItemText, this.state.isAboutPressed && styles.highlight]}>
            About
          </RN.Text>
        </RN.View>
     </RN.TouchableWithoutFeedback>
     </RN.View>
    )
  }
}

//--------------------------------------------------------------------//

export default MenuScreen;
