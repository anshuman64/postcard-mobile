//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Callback function for setting state
export const setStateCallback = (component, state) => {
  return(
    () => (component.setState(state))
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

export const mergeSorted = (arrayA, arrayB) => {
  var i = 0;
  var j = 0;
  var m = arrayA.length;
  var n = arrayB.length;
  var arrayC = [];

  while (i < m && j < n){
    if (arrayA[i] > arrayB[j]){
      arrayC.push(arrayA[i])
      i += 1
    } else if (arrayB[j] > arrayA[i]) {
      arrayC.push(arrayB[j])
      j+= 1
    } else {
      arrayC.push(arrayB[j])
      j += 1
      i += 1
    }
  }

  while (j < n) {
    arrayC.push(arrayB[j])
    j += 1
  }

  return arrayC;
}
