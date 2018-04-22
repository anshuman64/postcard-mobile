// Library Imports
import * as _ from 'lodash';

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

// Returns user or group depending on convoId
export const getConvo = (convoId, usersCache, groupsCache) => {
  let convo;

  if (convoId > 0) {
    convo = usersCache[convoId];
  } else if (convoId < 0) {
    convo = groupsCache[convoId];
  }

  return convo;
}

// Returns name of group or a comma separated list of users
const getTempGroupName = (users, usersCache) => {
  let string = '';

  for (i = 0; i < users.length - 1; i++) {
    string += usersCache[users[i].id].username + ', '
  }

  string += usersCache[users[users.length-1].id].username

  return string;
}

// Returns username of user, name of group, or a comma separated list of users
export const getConvoDisplayName = (convoId, usersCache, groupsCache) => {
  let convo;
  let displayName;

  if (convoId > 0) {
    convo = usersCache[convoId];
    displayName = convo && convo.username ? convo.username : 'anonymous';
  } else if (convoId < 0) {
    convo = groupsCache[convoId];
    displayName = convo && convo.name ? convo.name : getTempGroupName(convo.users, usersCache);
  }

  return displayName;
}

export const getConvoAuthorId = (convoId, usersCache, groupsCache) => {
  let convo;
  let authorId;

  if (convoId > 0) {
    authorId = convoId;
  } else if (convoId < 0) {
    convo = groupsCache[convoId];
    authorId = convo && convo.peek_message ? convo.peek_message.author_id : null;
  }

  return authorId;
}

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
