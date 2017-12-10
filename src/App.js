// Library Imports
import React        from 'react';
import { Provider } from 'react-redux';

// Local Imports
import configureStore         from './store/store.js'
import AppWithNavigationState from './utilities/app_navigator.js';

//--------------------------------------------------------------------//


class App extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={ this.store }>
        <AppWithNavigationState />
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
