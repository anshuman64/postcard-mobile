import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import firebase from 'react-native-firebase';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      user: 'null',
      idToken: 'null',
      error: 'null',
      count: 0
    };
  }


  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user, count: this.state.count+1 });
        this.getToken();

      }
    });
  }

  logIn() {
    firebase.auth().signInWithEmailAndPassword('anshuman64@gmail.com', 'password')
      .then( (user) => {this.setState({ user: user})});
  }

  getToken() {
    firebase.auth().currentUser.getIdToken(false)
      .then( (idToken) => {this.setState( {idToken: idToken})})
      .catch( (error) => {this.setState( {idToken: 'bye'})})
  }

  logOut() {
    firebase.auth().signOut()
    .then( (user) => {this.setState({ user: null})});
  }

  render() {
    return(
      <View>
        <Button title='Log In' onPress={() => this.logIn()} />

        <Text>{ JSON.stringify(this.state.user) }</Text>
        <Text>{ JSON.stringify(this.state.count) }</Text>
        <Button title='Log Out' onPress={() => this.logOut()} />
        <Button title='Get Token' onPress={() => this.getToken()} />
        <Text>{ this.state.idToken }</Text>
        </View>
    );
  }
}

export default App;




// <TextInput placeholder='email'/>
// <TextInput placeholder='password'/>
  // <TextInput placeholder='password'/>
