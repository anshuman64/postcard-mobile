// Library Imports
import React                    from 'react';
import { AppRegistry }          from 'react-native';
import { Provider }             from 'react-redux';
import { createStore }          from 'redux';

// Local Imports
import store                    from './store/store.js'
import RootReducer              from './reducers/root_reducer.js';
import AppWithNavigationState   from './utilities/app_navigator.js';


//--------------------------------------------------------------------//

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//


export default App;
