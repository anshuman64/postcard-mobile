// Library Imports
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';

// Local Imports
import { ENV_TYPES, SERVER_ENV_SETTING } from '../app_config.js';
import { setErrorDescription }           from './error_utility.js';
import { amplitude }                     from './analytics_utility.js';
import { refreshAuthToken }              from '../actions/user_actions.js';

//--------------------------------------------------------------------//


//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//


let s3Client = null;
export let postPlaceholders;


//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//


// Returns the right Bucket Name depending on environment setting
let getBucketName = () => {
  switch (SERVER_ENV_SETTING) {
    case ENV_TYPES.PRODUCTION:
      return 'insiya-users';
    case ENV_TYPES.TEST:
      return 'insiya-users-test';
    default:
      return 'insiya-users-dev';
  }
};

// Reads an image file and returns a buffer to prepare for AWS S3 uploading
let readImageFile = (imagePath) => {
  return RNFetchBlob.fs.readFile(imagePath, 'base64')
    .then((data) => {
      return new Buffer(data, 'base64');
    })
    .catch((error) => {
      throw setErrorDescription(error, 'Read image file failed');
    });
};

// Returns AWS S3 upload params
let getParamsForImage = (userId, imageType, buffer, folderPath) => {
  let userFolder = userId;
  let name       = uuid.v1();
  let ext        = mime.extension(imageType);
  let folder     = folderPath ? folderPath : '';

  return {
    Body: buffer,
    Bucket: getBucketName(),
    Key: userFolder + '/' + folder + name + '.' + ext,
    ServerSideEncryption: 'AES256',
    ContentType: imageType
  };
};


//--------------------------------------------------------------------//
// Interface
//--------------------------------------------------------------------//

// Gets an s3 client or creates one if one doesn't exist.
export const setS3Client = () => {
  s3Client = new AWS.S3();
};

// Gets signed url for image from AWS S3 bucket using path key
export const getFile = (key) => {
  return s3Client.getSignedUrl('getObject', { Bucket: getBucketName(), Key: key, Expires: 3600 });
};

// Deletes file from AWS S3 bucket using path key
export const deleteFile = (authToken, firebaseUserObj, key) => (dispatch) => {
  return new Promise((resolve, reject) => {
    s3Client.deleteObject({ Bucket: getBucketName(), Key: key }, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          return dispatch(refreshAuthToken(firebaseUserObj, deleteFile, key))
            .then((data) => {
              resolve(data);
            }, (error) => {
              reject(setErrorDescription(error, 'Delete file in S3 failed'));
            });
        }

        reject(setErrorDescription(error, 'Delete file in S3 failed'));
      } else {
        resolve(data);
      }
    });
  });
};

// Uploads file to AWS S3 bucket
export const uploadFile = (authToken, firebaseUserObj, imagePath, imageType, userId, folderPath)  => (dispatch) => {
  return readImageFile(imagePath)
    .then((buffer) => {
      params = getParamsForImage(userId, imageType, buffer, folderPath);

      return new Promise((resolve, reject) => {
        s3Client.upload(params, (error, data) => {
          if (error) {
            if (error.message === "Missing credentials in config") {
              return dispatch(refreshAuthToken(firebaseUserObj, uploadFile, params))
                .then((data) => {
                  resolve(data);
                }, (error) => {
                  reject(setErrorDescription(error, 'Upload file to S3 failed'));
                });
            }

            reject(setErrorDescription(error, 'Upload file to S3 failed'));
          } else {
            resolve(data);
          }
        });
      });
    });
};

export const getPostPlaceholders = () => {
  RNFetchBlob.fetch('GET', 'https://s3.amazonaws.com/insiya-public/placeholders.csv')
    .then((data) => {
      postPlaceholders = data.text().split(/\r?\n/);
    })
    .catch((error) => {
      amplitude.logEvent('Error - Get Post Placeholders', { error_message: error.message, error_description: 'Get post placeholders from AWS failed' });
    });
};
