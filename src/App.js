// Library Imports
import React        from 'react';
import { Provider } from 'react-redux';

// Local Imports
import configureStore                  from './store';
import AppWithNavigationStateContainer from './router/app_with_navigation_state_container.js';

//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();

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
