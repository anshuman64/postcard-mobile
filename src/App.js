// Library Imports
import React        from 'react';
import { Provider } from 'react-redux';
import RNAmplitute  from 'react-native-amplitude-analytics';

// Local Imports
import configureStore                  from './store';
import AppWithNavigationStateContainer from './router/app_with_navigation_state_container.js';

//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();

  constructor() {
    super();
     const amplitude = new RNAmplitute('fa9aded0e5b7590482fffff78b2bd85c');

     // log an event with data
     amplitude.logEvent('InitializeApp');
  }

  render() {
    return (
      <Provider store={ this.store }>
        <AppWithNavigationStateContainer />
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
