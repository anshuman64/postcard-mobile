// Library Imports
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';

//--------------------------------------------------------------------//

// const s3 = new AWS.S3(); Debug Test
const BUCKET_NAME = 'insiya-users';

let s3 = null;

const getClient = () => {
  if (!s3) {
    s3 = new AWS.S3();
  }

  return s3;
};

export const getImage = (firebaseUserObj, refreshAuthToken, key) => {
  return new Promise((resolve, reject) => {
    getClient().getSignedUrl('getObject', { Bucket: BUCKET_NAME, Key: key }, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          debugger
          return refreshAuthToken(firebaseUserObj) //TODO: ask Vin why this doesn't work and find workaround
            .then(() => {
              return getImage(firebaseUserObj, refreshAuthToken, key);
            })
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
          debugger
          return refreshAuthToken(firebaseUserObj)
            .then(() => {
              return deleteFile(firebaseUserObj, refreshAuthToken, key);
            })
        }

        reject(error);
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

const readImageFile = (imagePath) => {
  return RNFetchBlob.fs.readFile(imagePath, 'base64')
    .then((data) => {
      buffer = new Buffer(data, 'base64');
      return new Promise.resolve(buffer);
    })
    .catch((error) => {
      if (!error.description) {
        error.description = 'Read image file failed'
      }

      throw error;
    });
}

const getParamsForImage = (userId, imageType, buffer, folderPath) => {
  userFolder = userId;
  name = uuid.v1();
  ext = mime.extension(imageType);
  folder = folderPath ? folderPath : '';

  params = {
    Body: buffer,
    Bucket: "insiya-users",
    Key: userFolder + '/' + folder + name + '.' + ext,
    ServerSideEncryption: "AES256",
    ContentType: imageType
  };

  return params;
}


const uploadFile = (firebaseUserObj, refreshAuthToken, params) => {
  return new Promise((resolve, reject) => {
    getClient().upload(params, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          return refreshAuthToken(firebaseUserObj)
            .then(() => {
              return uploadFile(firebaseUserObj, params, refreshAuthToken);
            })
        }

        if (!error.description) {
          error.description = 'Upload file to S3 failed'
        }

        reject(error);
      } else {
        resolve(data);
      }
   });
  })
}
