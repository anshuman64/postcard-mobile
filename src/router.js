// Library Imports
import Navigation from 'react-navigation';

// Local Imports
import Login  from './components/screens/login';
import Verify from './components/screens/verify';

//--------------------------------------------------------------------//


const routes = {
  Login: {
    screen: Login
  },
  Verify: {
    screen: Verify
  }
};

const Router = Navigation.StackNavigator(routes);


//--------------------------------------------------------------------//

export default Router;
