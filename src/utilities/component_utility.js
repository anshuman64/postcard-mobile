//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Callback function for setting state
export const setStateCallback = (state) => {
  return(
    () => (setState(state))
  )
}

// Callback function for setting state in animation frame; recommended by React Native docs for animations
export const setStateInAnimationFrame = (component, state) => {
  return(
    () => (requestAnimationFrame(() => {component.setState(state)}))
  )
}

export const getCurrentRoute = (state) => {
  if (state.index !== undefined) {
    return getCurrentRoute(state.routes[state.index])
  } else {
    return state.routeName
  }
}
