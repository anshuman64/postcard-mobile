//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const setStateCallback = (component, state) => {
  let func = () => {
    component.setState(state);
  }

  return func;
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
