// Library Imports
import React from 'react';
import RN    from 'react-native';
import crypto   from 'crypto';

// Local Imports
import { styles } from './debug_login_screen_styles.js';


//--------------------------------------------------------------------//


class DebugLoginScreen extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      emailInput:     'debug@insiya.io',
      passwordInput:  'password',
    };

    this.isNextPressed = false;

    let method = 'GET' + '\n';
    let uri = 'https://s3.amazonaws.com/insiya-users/hello.jpg' + '\n';
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

    let hashedCanonicalRequest = crypto.createHash('sha256').update(canonicalRequest, 'utf8').digest('hex');
    let stringToSign = algorithm + '\n' + requestDateTime + '\n' + credentialScope + '\n' + hashedCanonicalRequest;

    console.log(stringToSign)

    let dateKey = crypto.createHmac('sha256', 'AWS4' + 'tEJ+DTxR4Kx0f5pnMu8lHUQGfTyoF3aGZmw8t5TO').update(shortDate, 'utf8');
    let dateRegionKey = crypto.createHmac('sha256', dateKey).update(region, 'utf8');
    let dateRegionServiceKey = crypto.createHmac('sha256', dateRegionKey).update(service, 'utf8');
    let signingKey = crypto.createHmac('sha256', dateRegionServiceKey).update(endString, 'utf8');

    let signature = crypto.createHmac('sha256', signingKey).update(stringToSign, 'utf8').digest('hex');

    let header = algorithm + ' Credential=' + 'AKIAIEA5FRZ5SWBSWF3Q' + '/' + credentialScope + ',SignedHeaders=' + signedHeaders + ',Signature=' + signature;


    this.date = amzDateTime;
    this.header = header;

    console.log(this.date)
    console.log(this.header)
  }

  //--------------------------------------------------------------------//
  // Callback Methods
  //--------------------------------------------------------------------//

  _onNextButtonPress() {
    if (this.isNextPressed) {
      return;
    }

    this.isNextPressed = true;

    this.props.debugSignIn(this.state.emailInput, this.state.passwordInput)
      .then(() => {
        if (!this.props.user.username) {
          return this.props.navigateTo('UsernameScreenLogin');
        } else {
          return this.props.navigateTo('HomeScreen');
        }
      })
      .catch((error) => {
        console.error(error.description);
        this.isNextPressed = false;
      });
  }

  //--------------------------------------------------------------------//
  // Render Methods
  //--------------------------------------------------------------------//

  _renderLogo() {
    return (
      <RN.View style={ styles.topView }>
        <RN.Image
          style={ styles.logo }
          source={require('../../assets/images/logo/logo.png')}
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

  // method: 'GET',
  // headers: {
  //   'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  //   'X-Amz-Date': '20180112T032040Z',
  //   'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIAIRQS2UB5N25VO62A/20180112/us-east-1/s3/aws4_request, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=004df2290460899d4b31675a75d1cd5586a454a37e1906daa48a31b6dc60edc4'
  // }

  // <RN.Text style={styles.nextButtonText}>
  //   Next
  // </RN.Text>

  _renderNextButton() {
    return (
      <RN.TouchableHighlight
        style={ styles.nextButtonBackground }
        onPress={() => this._onNextButtonPress()}
        underlayColor='#0050a7'
        >

        <RN.Image style={{height: 50, width: 50}} resizeMode={'cover'} source={{
          uri: 'https://s3.amazonaws.com/insiya-users/hello.jpg',
          method: 'GET',
          headers: {
            'X-Amz-Content-Sha256': 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            'X-Amz-Date': this.date,
            'host': 's3.amazonaws.com',
            'Authorization': this.header
          }
        }}
        />
      </RN.TouchableHighlight>
    )
  }

  render() {
    return (
      <RN.View style={ styles.container }>
        {this._renderLogo()}
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
