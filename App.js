import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyDq91xiqFcUtOGRV4L6UbXWyCZetDb5LO0",
  authDomain: "fir-rn-ffc81.firebaseapp.com",
  databaseURL: "https://fir-rn-ffc81.firebaseio.com",
  projectId: "fir-rn-ffc81",
  storageBucket: "fir-rn-ffc81.appspot.com",
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user !== null) {
        console.log(user)
      }
    })
  }

  signupUser = (email, password) => {
    try{
      if(this.state.password.length <6)
      {
        alert("Please enter atleast 6 characters")
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password)
    }
    catch(error){
      alert(error.toString())
      return;
    }
  };

  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)
      }, function (error) {
        alert(error.toString())
        return;
      });
    }
    catch(error){
      alert(error.toString())
      return;
    }
  };

  async loginWithFacebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('185133775601599',{ permissions: ['public_profile'] })

    if (type == 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredential(credential).catch((error) => {
        console.log(error)
      })
    }
  }

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{ marginTop: 10}}
            full
            rounded
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Login</Text>
          </Button>

          <Button style={{ marginTop: 10}}
            full
            rounded
            primary
            onPress={() => this.signupUser(this.state.email, this.state.password)}
          >
            <Text style={{ color: 'white' }}>Sign up</Text>
          </Button>

          <Button style={{ marginTop: 10}}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook()}
          >
            <Text style={{ color: 'white' }}>Login With Facebook</Text>
          </Button>

        </Form>
      </Container>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
