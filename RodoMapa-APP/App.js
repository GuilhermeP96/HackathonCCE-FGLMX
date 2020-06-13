/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

export default class App extends React.Component {
  componentDidMount() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '605986378152-eatnfalfnij14ucei18kncmdv59rbqui.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      //hostedDomain: '', // specifies a hosted domain restriction
      //loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      //accountName: '', // [Android] specifies an account name on the device that should be used
      //iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });
  }
  _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View>
          <Image
            style={styles.imagemLogo}
            source={require('./src/assets/logo.jpeg')}
          />
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Digite seu e-mail" />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.botao}>
            <Text style={styles.botaoAcessar}>Acessar</Text>
          </TouchableOpacity>
          <GoogleSigninButton
            style={styles.botaoLoginGoogle}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            Text="teste"
          />
          <TouchableOpacity style={styles.criarConta}>
            <Text style={styles.botaoCriarConta}>Criar uma conta agora</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,0,0)',
  },
  input: {
    marginTop: 20,
    width: 300,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 3,
    fontWeight: 'bold',
  },
  botao: {
    marginTop: 30,
    width: 300,
    height: 45,
    backgroundColor: 'rgb(182,143,39)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  botaoAcessar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  criarConta: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  botaoCriarConta: {
    color: '#FFF',
    fontSize: 16,
  },
  imagemLogo: {
    height: 270,
    width: 500,
  },
  botaoLoginGoogle: {
    marginTop: 20,
    width: 312,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
  },
});
