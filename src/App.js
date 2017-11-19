// Library Imports
import React      from 'react';
import Navigation from 'react-navigation';

// Local Imports
import Routes from './routes';

//--------------------------------------------------------------------//


const RootNavigator = Navigation.StackNavigator(Routes);

class App extends React.Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}


//--------------------------------------------------------------------//

export default App;
