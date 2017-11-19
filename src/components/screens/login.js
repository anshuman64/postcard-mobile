// Library Imports
import React                                                    from 'react';
import { Platform, StyleSheet, View, Text, TouchableHighlight } from 'react-native';

//--------------------------------------------------------------------//


class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Phone number login page
        </Text>

        <TouchableHighlight onPress={() => this.props.navigation.navigate('Verify')} style={styles.nextButton} >
          <Text>
            next
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}


//--------------------------------------------------------------------//
// Styles
//--------------------------------------------------------------------//


let styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'gray'
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  nextButton: {
    justifyContent: 'center',
    height: 40
  }
});


//--------------------------------------------------------------------//

export default Login;
