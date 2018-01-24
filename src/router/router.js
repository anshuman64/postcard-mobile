// Library Imports
import React               from 'react';
import { Router, Reducer } from 'react-native-router-flux';

//--------------------------------------------------------------------//


class CustomRouter extends React.Component {
  reducerCreate (params) {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
      this.props.dispatch(action);
      return defaultReducer(state, action);
    };
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  render () {
    return (
      <Router createReducer={this.reducerCreate.bind(this)} >
        {this.props.children}
      </Router>
    )
  }
}


//--------------------------------------------------------------------//

export default CustomRouter;
