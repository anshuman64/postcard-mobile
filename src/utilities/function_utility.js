//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//


// Checks if string is empty (null, blank, or spaces only)
export const isStringEmpty = (string) => {
  return string.length === 0 || !string.trim();
};

// Gets a random integer between 0 and max
export const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

// Callback function to set state on current component
export const setStateCallback = (component, state) => {
  return () => {
    component.setState(state);
  };
};

export const getReadableCount = (count) => {
  // If likes < 1000, render the number as-is
  if (count < 1000) {
    return count;
  // If likes are > 1000, return format 'xxx.xK'
  } else if (count < 1000000000){
    return (Math.floor(count / 100) / 10).toFixed(1) + 'K';
  // If likes are > 1 milion, return format 'xxx.xM'
  } else {
    return (Math.floor(count / 100000) / 10).toFixed(1) + 'M';
  }
}

// Merges arrayB into arrayA. Used in refreshPost reducer
export const mergeSorted = (arrayA, arrayB) => {
  let i = 0;
  let j = 0;
  let m = arrayA.length;
  let n = arrayB.length;
  let arrayC = [];

  while (i < m && j < n){
    if (arrayA[i] > arrayB[j]){
      arrayC.push(arrayA[i]);
      i += 1;
    } else if (arrayB[j] > arrayA[i]) {
      arrayC.push(arrayB[j]);
      j+= 1;
    } else {
      arrayC.push(arrayB[j]);
      j += 1;
      i += 1;
    }
  }

  while (j < n) {
    arrayC.push(arrayB[j]);
    j += 1;
  }

  return arrayC;
}
