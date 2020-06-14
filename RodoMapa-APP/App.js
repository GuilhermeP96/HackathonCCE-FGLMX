/* eslint-disable prettier/prettier */
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
GoogleSignin.configure({});
export default class App extends React.Component {

  _signIn = async () => {
    try {
      const has = await GoogleSignin.hasPlayServices();
      console.warn(has);
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      //this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        console.error(error);
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
