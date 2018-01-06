// Library Imports
import React from 'react';
import RN    from 'react-native';
import AWS from 'aws-sdk';
import { Buffer } from 'buffer';
import RNFetchBlob from 'react-native-fetch-blob';

// Local Imports
import { styles } from './debug_login_screen_styles.js';
import img from '../../assets/images/icon/icon.png';


//--------------------------------------------------------------------//


class DebugLoginScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'debug@insiya.io',
      passwordInput:  'password',
    };


    AWS.config.region = 'us-east-1'

    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
       IdentityPoolId: 'us-east-1:b0ea4b39-a029-4417-9457-8ec4b4f20b2d',
       Logins: {
          'securetoken.google.com/insiya-mobile': this.props.authToken
       },

    }, {
      region: 'us-east-1'
    })

    console.log(AWS.config.credentials.get((err) => console.log(err)))

    console.log(AWS.config.credentials.get((err) => console.log(err)))

    s3Client = new AWS.S3()

    console.log(s3Client.getSignedUrl('getObject', { Bucket: 'insiya-users', Key: 'anshuman/Icon_ExactFit_200x200.png' }))

    console.log(AWS.config);

    AWS.config.credentials.refresh(() => {

      s3Client = new AWS.S3()

      console.log(s3Client.getSignedUrl('getObject', { Bucket: 'insiya-users', Key: 'anshuman/Icon_ExactFit_200x200.png' }))

      console.log(AWS.config);
    })



   //
   //  s3Client.deleteObject({ Bucket: 'insiya-users', Key: 'Icon_60@2x.png' }, (err, data) => {
   //    if (err) {
   //      console.log(err, err.stack); // an error occurred
   //    } else {
   //      console.log(data);           // successful response
   //    }
   // })
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress() {
    // this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
    //   .then(() => {
    //     this.props.navigateTo('HomeScreen');
    //   })
    //   .catch((error) => {
    //     console.error(error.description);
    //   });


    RN.CameraRoll.getPhotos({first: 5}).then((data) => {
      console.log(data)

      RNFetchBlob.fs.readFile(data.edges[0].node.image.uri, 'base64')
        .then(data => new Buffer(data, 'base64'))
        .then((buffer) => {
          params = {
            Body: buffer,
            Bucket: "insiya-users",
            Key: "hello.jpg",
            ServerSideEncryption: "AES256",
            ContentType: 'image/jpeg'
          };

          s3Client.upload(params, (err, data) => {
            if (err) {
              console.log(err, err.stack); // an error occurred
            } else {
              console.log(data);           // successful response
            }
         })
        })




    })

  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={ styles.topView }>
        <RN.Image
          style={ styles.logo }
          source={{uri: url}}

          resizeMode='contain'
          />
      </RN.View>
    )
  }

  _renderEmailInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => setState({ emailInput: value })}
        value={this.state.emailInput}
        underlineColorAndroid={'transparent'}
      />
    )
  }

  _renderPasswordInput() {
    return (
      <RN.TextInput
        style={styles.textInput}
        onChangeText={(value) => setState({ emailInput: value })}
        value={this.state.passwordInput}
        underlineColorAndroid={'transparent'}
        secureTextEntry={true}
      />
    )
  }

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={ styles.nextButtonBackground }
        onPress={() => this._onNextButtonPress()}
        underlayColor='#0050a7'
        >
        <RN.Text style={styles.nextButtonText}>
          Next
        </RN.Text>
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        <RN.View style={ styles.bottomView }>
          {this._renderEmailInput()}
          {this._renderPasswordInput()}
          {this._renderNextButton()}
        </RN.View>
      </RN.View>
    )
  }
}


// --------------------------------------------------------------------


export default DebugLoginScreen;
