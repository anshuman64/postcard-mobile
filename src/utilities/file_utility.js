// Library Imports
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';

//--------------------------------------------------------------------//

// const s3 = new AWS.S3(); Debug Test

export const getSignedUrl = (firebaseUserObj, refreshAuthToken, type, params) => {
  s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
    s3.getSignedUrl(type, params, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          debugger
          return refreshAuthToken(firebaseUserObj) //TODO: ask Vin why this doesn't work and find workaround
            .then(() => {
              return getSignedUrl(firebaseUserObj, refreshAuthToken, type, params);
            })
        }

        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export const deleteFile = (firebaseUserObj, refreshAuthToken, params) => {
  s3 = new AWS.S3();

  return new Promise((resolve, reject) => {
    s3.deleteObject(params, (error, data) => {
      if (error) {
        if (error.message === "Missing credentials in config") {
          debugger
          return refreshAuthToken(firebaseUserObj)
            .then(() => {
              return deleteFile(firebaseUserObj, refreshAuthToken, params);
            })
        }

        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

export const uploadImageFile = (firebaseUserObj, refreshAuthToken, imageNode, userId) => {
  s3 = new AWS.S3();

  return readImageFile(imageNode)
    .then((buffer) => {
      params = getParamsForImage(userId, imageNode, buffer);

      return uploadFile(firebaseUserObj, refreshAuthToken, params);
    });
}

const readImageFile = (imageNode) => {
  return RNFetchBlob.fs.readFile(imageNode.image.uri, 'base64')
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

const getParamsForImage = (userId, imageNode, buffer) => {
  folder = userId;
  name = uuid.v1();
  ext = mime.extension(imageNode.type);

  params = {
    Body: buffer,
    Bucket: "insiya-users",
    Key: folder + '/' + name + '.' + ext,
    ServerSideEncryption: "AES256",
    ContentType: imageNode.type
  };

  return params;
}


const uploadFile = (firebaseUserObj, refreshAuthToken, params) => {
  return new Promise((resolve, reject) => {
    s3.upload(params, (error, data) => {
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
