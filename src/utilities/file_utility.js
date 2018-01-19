// Library Imports
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';

// Local Imports
import { ENV_TYPES, GLOBAL_ENV_SETTING } from './app_utility.js';
import { setErrorDescription }           from './error_utility.js';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

const BUCKET_NAME = getBucketName();
const S3_CLIENT   = null;

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

function getBucketName() {
  if (GLOBAL_ENV_SETTING === ENV_TYPES.PRODUCTION) {
    return 'insiya-users';
  } else if (GLOBAL_ENV_SETTING === ENV_TYPES.TEST) {
    return 'insiya-users-test';
  } else {
    return 'insiya-users-dev';
  }
}

let getClient = () => {
  if (!S3_CLIENT) {
    S3_CLIENT = new AWS.S3();
  }

  return S3_CLIENT;
};


let readImageFile = (imagePath) => {
  return RNFetchBlob.fs.readFile(imagePath, 'base64')
    .then((data) => {
      buffer = new Buffer(data, 'base64');
      return new Promise.resolve(buffer);
    })
    .catch((error) => {
      throw setErrorDescription(error, 'Read image file failed');
    });
};

let getParamsForImage = (userId, imageType, buffer, folderPath) => {
  userFolder = userId;
  name = uuid.v1();
  ext = mime.extension(imageType);
  folder = folderPath ? folderPath : '';

  params = {
    Body: buffer,
    Bucket: BUCKET_NAME,
    Key: userFolder + '/' + folder + name + '.' + ext,
    ServerSideEncryption: 'AES256',
    ContentType: imageType
  };

  return params;
};

let refreshAWSToken = (firebaseUserObj, refreshAuthToken, func, ...params) => {
  return refreshAuthToken(firebaseUserObj)
    .then(() => {
      S3_CLIENT = new AWS.S3();
      return func(firebaseUserObj, refreshAuthToken, ...params);
    })
}

let uploadFile = (firebaseUserObj, refreshAuthToken, params) => {
  return new Promise((resolve, reject) => {
    getClient().upload(params, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          return refreshAWSToken(firebaseUserObj, refreshAuthToken, uploadFile, params);
        }

        reject(setErrorDescription(error, 'Upload file to S3 failed'));
      } else {
        resolve(data);
      }
   });
  })
};


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

export const getImage = (firebaseUserObj, refreshAuthToken, key) => {
  return new Promise((resolve, reject) => {
    getClient().getSignedUrl('getObject', { Bucket: BUCKET_NAME, Key: key }, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          return refreshAWSToken(firebaseUserObj, refreshAuthToken, getImage, key);
        }

        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export const deleteFile = (firebaseUserObj, refreshAuthToken, key) => {
  return new Promise((resolve, reject) => {
    getClient().deleteObject({ Bucket: BUCKET_NAME, Key: key }, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          return refreshAWSToken(firebaseUserObj, refreshAuthToken, deleteFile, key);
        }

        reject(setErrorDescription(error, 'Delete file in S3 failed'));
      } else {
        resolve(data);
      }
    });
  });
}

export const uploadImageFile = (firebaseUserObj, refreshAuthToken, imagePath, imageType, userId, folderPath) => {
  return readImageFile(imagePath)
    .then((buffer) => {
      params = getParamsForImage(userId, imageType, buffer, folderPath);

      return uploadFile(firebaseUserObj, refreshAuthToken, params);
    });
}
