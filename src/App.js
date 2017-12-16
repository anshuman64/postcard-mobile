// Library Imports
import React        from 'react';
import { Provider } from 'react-redux';
import { NativeModules } from 'react-native';
import { RNAmplitude as Amplitude } from 'NativeModules';

// Local Imports
import configureStore                  from './store';
import AppWithNavigationStateContainer from './router/app_with_navigation_state_container.js';

//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();


  render() {
  Amplitude.logEvent('InitializeApp');
    return (
      <Provider store={ this.store }>
        <AppWithNavigationStateContainer />
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
