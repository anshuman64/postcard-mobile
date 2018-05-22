// Library Imports
import { Alert }   from 'react-native';
import _           from 'lodash';
import Permissions from 'react-native-permissions';

// Local Imports
import { amplitude } from './analytics_utility';

//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Checks if string is empty (null, blank, or spaces only)
export const isStringEmpty = (string) => {
  return !string || string.length === 0 || !string.trim();
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

// Takes media from posts and gets imageUrls for ImageViewer
export const getImageUrlsFromMedia = (media, mediaCache) => {
  let imageUrls = [];
  let cachedMedium;
  let mediumUrl;

  _.forEach(media, (medium) => {
    cachedMedium = mediaCache[medium.id];
    mediumUrl = cachedMedium ? cachedMedium.url : null;

    if (mediumUrl && cachedMedium.mime_type.startsWith('image/')) {
      imageUrls.push({ url: mediumUrl });
    }
  });

  return imageUrls;
}

export const getDomainFromUrl = (url) => {
  let hostname;

  //find & remove protocol (http, ftp, etc.) and get hostname
  if (url.indexOf("://") > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  hostname = hostname.split(':')[0]; //find & remove port number
  hostname = hostname.split('?')[0]; //find & remove "?"

  return hostname;
}

export const checkPermissions = (type, callback) => {
  let alertString;

  if (type === 'contacts') {
    alertString = "Postcard is only fun when we can find your friends. Go to \"Settings\" > \"Postcard\" and enable \"Contacts.\"";
  } else if (type === 'photo') {
    alertString = "Postcard is more fun when you can share photos. Go to \"Settings\" > \"Privacy\" > \"Photos\" > \"Postcard\" and enable \"Read and Write.\"";
  } else if (type === 'camera') {
    alertString = "Postcard is more fun when you can share photos. Go to \"Settings\" > \"Privacy\" > \"Camera\" and enable \"Postcard.\"";
  }

  return Permissions.check(type)
    .then((response) => {
      if (response === 'authorized') {
        callback();
      } else {
        return Permissions.request(type)
          .then((response) => {
            if (response === 'authorized') {
              callback();
            } else {
              Alert.alert('', alertString, [{text: 'OK', style: 'cancel'}]);
            }
          })
          .catch((error) => {
            error.description = 'Request ' + type + ' permissions failed';
            amplitude.logEvent('Permissions - Request ' + type, { error_description: error.description, error_message: error.message });
          });
      }
    })
    .catch((error) => {
      error.description = 'Check ' + type + ' permissions failed';
      amplitude.logEvent('Permissions - Check ' + type, { error_description: error.description, error_message: error.message });
    });
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
