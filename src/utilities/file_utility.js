// Library Imports
import AWS                                    from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob                            from 'react-native-fetch-blob';
import Contacts                               from 'react-native-contacts';
import _                                      from 'lodash';
import { Buffer }                             from 'buffer';
import uuid                                   from 'react-native-uuid';
import mime                                   from 'mime-types';
import { PhoneNumberUtil, PhoneNumberFormat } from 'google-libphonenumber';

// Local Imports
import { ENV_TYPES, AWS_ENV_SETTING }                 from '../app_config';
import { setErrorDescription, refreshCredsAndResume } from './error_utility';
import { amplitude }                                  from './analytics_utility';

//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
// Constants
//--------------------------------------------------------------------//

let s3Client = null;

//--------------------------------------------------------------------//
// Helper Functions
//--------------------------------------------------------------------//

// Returns the right Bucket Name depending on environment setting
let getBucketName = () => {
  switch (AWS_ENV_SETTING) {
    case ENV_TYPES.PRODUCTION:
      return 'insiya-users';
    case ENV_TYPES.TEST:
      return 'insiya-users-test';
    default:
      return 'insiya-users-dev';
  }
};

// Reads a file and returns a buffer to prepare for AWS S3 uploading
let readFile = (filePath) => {
  return RNFetchBlob.fs.readFile(filePath, 'base64')
    .then((data) => {
      return new Buffer(data, 'base64');
    })
    .catch((error) => {
      throw setErrorDescription(error, 'Read file failed');
    });
};

// Returns AWS S3 upload params
let getParamsForFile = (userId, mimeType, buffer, folderPath) => {
  let userFolder = userId;
  let name       = uuid.v1();
  let ext        = mime.extension(mimeType);
  let folder     = folderPath ? folderPath : '';

  return {
    Body: buffer,
    Bucket: getBucketName(),
    Key: userFolder + '/' + folder + name + '.' + ext,
    ServerSideEncryption: 'AES256',
    ContentType: mimeType
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

export const uploadMedia = (authToken, firebaseUserObj, userId, folderPath, media) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    for (let i in media) {
      try {
        media[i] = await dispatch(uploadFile(authToken, firebaseUserObj, userId, folderPath, media[i]));
      } catch (error) {
        reject(error);
      }
    };

    resolve(media);
  });
}

// Uploads file to AWS S3 bucket
// medium (object): has 'height', 'width', 'mime', 'path', and 'size' params
// Returns 'medium' with added 'awsPath' param
export const uploadFile = (authToken, firebaseUserObj, userId, folderPath, medium) => (dispatch) => {
  return readFile(medium.path)
    .then((buffer) => {
      params = getParamsForFile(userId, medium.mime, buffer, folderPath);

      return new Promise((resolve, reject) => {
        s3Client.upload(params, (error, data) => {
          if (error) {
            if (error.message === "Missing credentials in config") {
              return dispatch(refreshCredsAndResume(firebaseUserObj, uploadFile, userId, folderPath, medium))
                .then((data) => {
                  resolve(data);
                })
                .catch((error) => {
                  reject(setErrorDescription(error, 'Upload file to S3 failed'));
                });
            }

            reject(setErrorDescription(error, 'Upload file to S3 failed'));
          } else {
            medium.awsPath = data.key;
            resolve(medium);
          }
        });
      });
    });
};

// TODO: add email support
export const getDataFromContacts = (clientPhoneNumber) => {
  let clientNumber;
  let contactsObj = {};
  let number;
  let fullNumber;

  return new Promise((resolve, reject) => {
    Contacts.getAllWithoutPhotos((error, contacts) => {
      phoneUtil = PhoneNumberUtil.getInstance();

      try {
        clientNumber = phoneUtil.parse(clientPhoneNumber);
      } catch (err) {
        clientNumber = phoneUtil.parse('+14082551245');
      }

      if (error != 'denied') {
        _.forEach(contacts, (contact) => {
          _.forEach(contact.phoneNumbers, (phoneNumber) => {
            try {
              number = phoneUtil.parse(phoneNumber.number, phoneUtil.getRegionCodeForNumber(clientNumber));
              fullNumber = phoneUtil.format(number, PhoneNumberFormat.E164);

              contactsObj[fullNumber] = {
                phone_number: fullNumber,
                given_name:   contact.givenName,
                family_name:  contact.familyName,
                type:         phoneNumber.label,
                is_invited:   false,
              }
            } catch (err) {
              // console.log(err);
            }
          });
        });

        resolve(contactsObj);
      } else {
        reject(error);
      }
    });
  });
}
