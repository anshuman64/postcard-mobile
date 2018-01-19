//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Checks if string is empty (null, blank, or spaces only)
export const isStringEmpty = (string) => {
  return (string.length === 0 || !string.trim());
}

// Gets a random integer between 0 and max
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

// Callback function to set state on current component
export const setStateCallback = (component, state) => {
  let func = () => {
    component.setState(state);
  }

  return func;
}

// Merges arrayB into arrayA. Used in refreshPost reducer
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
