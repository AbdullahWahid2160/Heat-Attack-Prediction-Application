import React, { Component, useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import Logo from '../../Components/Logo';
import KeyboardShift from '../../Components/KeyboardShift';



export default class DoctorLogin extends Component {

  constructor(props) {
    super(props)
    this.validator = new SimpleReactValidator();
    this.state = {
      Email: "",
      Password: "",
      ErrorMessage: null,
      Loading: false,
      role: null
    };
  }


  componentDidMount() {
    console.log("this is fucking doctor's Login")
  }

  FieldsFilled = () => {
    const { Email, Password } = this.state
    if (Email == "" && Password == "") {
      alert("Email is required")
      return false
    }
    else if (Password == "") {
      alert("Password is required")
      return false
    }
    else
      return true
  }

  SetRole = async () => {
    try {
      this.state.role = await AsyncStorage.setItem('UserRole', "Doctor")
    } catch (e) {
      alert('Failed to save the data to the storage')
    }
  }

  HandleLogin = () => {
    if (this.FieldsFilled() == true) {
      if (this.validator.allValid()) {
        this.setState({ Loading: true })
        firebase
          .auth()
          .signInWithEmailAndPassword(this.state.Email, this.state.Password)
          .then((res) => {
            if (res != null) {
              console.log("Koi hy : ", res.user.uid)
              firebase
                .database()
                .ref('DoctorsList/')
                .child(res.user.uid)
                .on('value', snapshot => {
                  if (snapshot == null) {
                    this.setState({ Loading: false })
                    alert('Doctor tou bano pehly brooo')
                  }
                  else {
                    this.setState({ Loading: false })
                    this.props.navigation.navigate("DoctorPanel")
                  }
                });
            }
            else {

            }
          })
          .catch(error => this.setState({ ErrorMessage: error.message, Loading: false }))
      }
      else {
        <Text style={Styles.SignUpButton}>
          {this.validator.message('email', this.state.Email, 'required|email', 'text-danger')}
        </Text>
      }
    }
  }

  render() {
    this.validator.purgeFields();
    return (
      <KeyboardShift>
        {() => (
          <ScrollView contentContainerStyle={Styles.Container}>

            <Modal
              visible={this.state.Loading}
              transparent={true}
            >
              <View style={Styles.ModalContainer}>
                <View style={Styles.ModalContent}>
                  <Text>
                    Please wait...
							</Text>
                  <ActivityIndicator color='#cf655b' size='large'></ActivityIndicator>
                </View>
              </View>
            </Modal>

            <Logo />

            <View style={Styles.ErrorMessage}>
              {this.state.ErrorMessage && <Text style={Styles.ErrorText}>{this.state.ErrorMessage}</Text>}
            </View>

            <View style={Styles.FormContainer}>
              <TextInput style={Styles.InputBox}
                placeholder="Email"
                placeholderTextColor='#949393'
                autoCapitalize='none'
                onChangeText={(email) => this.setState({ Email: email })} value={this.state.Email}
                clearTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                keyboardType='email-address'
              />
              <TextInput style={Styles.InputBox}
                ref={(input) => { this.secondTextInput = input; }}
                placeholder='Password'
                placeholderTextColor='#949393'
                autoCapitalize='none'
                onChangeText={(password) => this.setState({ Password: password })}
                clearTextOnFocus={true}
                enablesReturnKeyAutomatically={true}
                secureTextEntry={true}
                keyboardType='default'
              />
              <TouchableOpacity style={Styles.LoginButton}>
                <Text style={Styles.ButtonText} onPress={this.HandleLogin}>
                  Login
						    </Text>
              </TouchableOpacity>
            </View>

            <View style={Styles.SignUpTextContainer}>
              <Text style={Styles.SignUpText}>Don't have an Account yet!  </Text>
              <TouchableOpacity>
                <Text
                  style={Styles.SignUpButton}
                  onPress={() => this.props.navigation.navigate('SignUp')}>
                  SignUp
						    </Text>
              </TouchableOpacity>
              <Text style={Styles.SignUpText}>  Here.</Text>
            </View>
          </ScrollView>
        )
        }
      </KeyboardShift>
    )
  }
}

const Styles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: '#000000aa',
    flex: 1
  },
  ModalContent: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 80,
    marginHorizontal: 10,
    borderRadius: 10,
    flexGrow: 1
  },
  Container: {
    backgroundColor: '#fff',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  ErrorMessage: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40
  },
  ErrorText: {
    color: 'red',
    fontSize: 20,
    fontWeight: "500",
    textAlign: 'center'
  },
  FormContainer: {
    flexGrow: 1,
    marginTop: -20
  },
  InputBox: {
    marginVertical: 7.5,
    width: 300,
    backgroundColor: '#d8d4d4',
    borderRadius: 18,
    paddingHorizontal: 10,
    fontSize: 20,
    paddingVertical: 10
  },
  LoginButton: {
    backgroundColor: "#cf655b",
    borderRadius: 25,
    width: 150,
    marginVertical: 40,
    paddingVertical: 14,
    alignSelf: 'center'
  },
  ButtonText: {
    fontSize: 25,
    fontWeight: '500',
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  SignUpTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 200
  },
  SignUpText: {
    color: 'black',
    fontSize: 20,
    fontWeight: "100"
  },
  SignUpButton: {
    color: '#cf655b',
    fontSize: 26,
    fontWeight: "900",
    fontWeight: 'bold'
  }
});