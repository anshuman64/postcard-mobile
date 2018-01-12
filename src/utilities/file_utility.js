// Library Imports
import AWS         from 'aws-sdk/dist/aws-sdk-react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer }  from 'buffer';
import uuid        from 'react-native-uuid';
import mime        from 'mime-types';
import crypto   from 'crypto';

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

export const getHeaders = () => {
  

  let method = 'GET' + '\n';
  let uri = 'https://s3.amazonaws.com/insiya-users/2/posts/1c346960-f70a-11e7-91fa-21640376b1b9.jpeg' + '\n';
  let query = '\n';

  let host = 'host:s3.amazonaws.com' + '\n';
  let content = 'x-amz-content-sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' + '\n';

  let dateTime = new Date().toISOString().replace(/[^A-Za-z0-9]+/g, '');
  let amzDateTime = dateTime.substr(0, dateTime.length-4) + dateTime[dateTime.length-1];
  let date = 'x-amz-date:' + amzDateTime + '\n';

  let headers = host + content + date + '\n';

  let signedHeaders = 'host;x-amz-content-sha256;x-amz-date';
  let hashedPayload = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' + '\n';
  let canonicalRequest = method + uri + query + headers + signedHeaders + '\n' + hashedPayload;

  console.log(canonicalRequest)

  let algorithm = 'AWS4-HMAC-SHA256';

  let requestDateTime = amzDateTime;

  let shortDate = amzDateTime.substr(0, 8);
  let region = 'us-east-1';
  let service = 's3';
  let endString = 'aws4_request'
  let credentialScope = amzDateTime.substr(0, 8) + '/' + region + '/' + service + '/' + endString;

  let hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest).digest('hex');
  let stringToSign = algorithm + '\n' + requestDateTime + '\n' + credentialScope + '\n' + hashedCanonicalRequest;

  console.log(stringToSign)

  let dateKey = crypto.createHmac('sha256', AWS.config.credentials.data.credentials.SecretKey).update(shortDate);
  let dateRegionKey = crypto.createHmac('sha256', dateKey).update(region);
  let dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update(service);
  let signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update(endString);

  let signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

  console.log(signature)

  let header = 'Authorization: ' + algorithm + ' Credential=' + AWS.config.credentials.data.credentials.AccessKeyId + '/' + credentialScope + ', SignedHeaders=' + signedHeaders + ', Signature=' + signature;
  console.log(header)
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
