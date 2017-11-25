/**
 * @flow
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import RootReducer from './reducers/root_reducer.js';
import AppWithNavigationState from './utilities/app_navigator.js';

class App extends React.Component {
  store = createStore(RootReducer);

  render() {
    return (
      <Provider store={this.store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}

export default App;
