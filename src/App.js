// Library Imports
import React        from 'react';
import RN from 'react-native';
import { Provider, connect } from 'react-redux';
import { Scene, Tabs }    from 'react-native-router-flux';
import RNAmplitute from 'react-native-amplitude-analytics';


// Local Imports
import configureStore  from './store';
import RouterContainer from './rnrf/router_container.js';
import DebugLoginScreenContainer  from './components/debug_login_screen/debug_login_screen_container.js';
import LoadingScreenContainer     from './components/loading_screen/loading_screen_container.js';
import LoginScreenContainer       from './components/login_screen/login_screen_container.js';
import ConfirmCodeScreenContainer from './components/confirm_code_screen/confirm_code_screen_container.js';
import NewPostScreen              from './components/new_post_screen/new_post_screen.js';
import MenuScreen                 from './components/menu_screen/menu_screen.js';
import HeaderContainer from './components/header/header_container.js';

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
        <RouterContainer>
          <Scene key='root' navBar={HeaderContainer}>
            <Scene key='DebugLoginScreen' component={DebugLoginScreenContainer} initial={true} />
            <Scene key='ConfirmCodeScreen' component={ConfirmCodeScreenContainer} />
            <Scene key='hello' component={DebugLoginScreenContainer} />
          </Scene>
        </RouterContainer>
      </Provider>
    );
  }
}


//--------------------------------------------------------------------//

export default App;
