import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Modal, AsyncStorage, ActivityIndicator } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import Logo from '../../Components/Logo';
import KeyboardShift from '../../Components/KeyboardShift';

export default class SignUpPage extends Component {

	constructor(props) {
		super(props)
		this.validator = new SimpleReactValidator();
		this.state = {
			FirstName: "",
			LastName: "",
			Email: "",
			Password: "",
			ConfirmPassword: "",
			ErrorMessage: null,
			Name: "",
			Loading: false,
			role: null,
			Gender: "",
			//DataAge: this.props.route.params.age,
			//DataGender:this.props.route.params.gender,
			//DataHeight:this.props.route.params.height,
			//DataWeight:this.props.route.params.weight,
			//DataSmoker:this.props.route.params.smoker,
			//DataAlcoholic:this.props.route.params.alcohlic,
			//DataActivity:this.props.route.params.activity,
		};
	}


	componentDidMount() {
		console.log("this is fucking doctor's Login")
	}

	FieldsFilled = () => {
		const { FirstName, LastName, Email, Password, ConfirmPassword } = this.state
		if (FirstName == "") {
			alert("First Name is required")
			return false
		}
		if (LastName == "") {
			alert("Last Name is required")
			return false
		}
		if (Email == "") {
			alert("Email is required")
			return false
		}
		if (Password == "") {
			alert("Password is required")
			return false
		}
		if (ConfirmPassword == "") {
			alert("Password Confirmation is required")
			return false
		}
		if (Password != ConfirmPassword) {
			alert("Confirmed Password should be same as Password")
			return false
		}
		return true
	}

	SetRole = async () => {
		try {
			this.state.role = await AsyncStorage.setItem('UserRole', "Doctor")
		} catch (e) {
			alert('Failed to save the data to the storage')
		}
	}

	HandleSignUp = async () => {
		if (this.FieldsFilled() == true) {
			this.setState({
				Loading: true
			})
			this.state.Name = this.state.FirstName.concat(" ", this.state.LastName);
			firebase
				.auth()
				.createUserWithEmailAndPassword(this.state.Email, this.state.Password)
				.then((response) => {
					this.SetRole();
					firebase
						.database()
						.ref('DoctorsList/')
						.child(response.user.uid)
						.set({
							Role: "Doctor",
							Email: this.state.Email,
							FirstName: this.state.FirstName,
							LastName: this.state.LastName,
							Gender: ""
						})
						.then(() => {
							this.setState({ Loading: false })
							this.props.navigation.navigate("DoctorPanel")
						}).catch((error) => {

						})
				})
				.catch(error => this.setState({ ErrorMessage: error.message }));
		}
		else {

		}
	}

	render() {
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

						<View style={Styles.FormContainer}>
							<TextInput style={Styles.InputBox}
								placeholder="First Name"
								placeholderTextColor='#949393'
								autoCapitalize='words'
								onChangeText={(value) => this.setState({ FirstName: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.secondTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.secondTextInput = input; }}
								placeholder="Last Name"
								placeholderTextColor='#949393'
								autoCapitalize='words'
								onChangeText={(value) => this.setState({ LastName: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.thirdTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.thirdTextInput = input; }}
								placeholder="Email"
								placeholderTextColor='#949393'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ Email: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.fourthTextInput.focus(); }}
								keyboardType='email-address'
							/>

							{this.validator.message('email', this.state.Email, 'email')}

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.fourthTextInput = input; }}
								placeholder='Password'
								secureTextEntry={true}
								placeholderTextColor='#949393'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ Password: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.fifthTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.fifthTextInput = input; }}
								placeholder='Confirm Password'
								secureTextEntry={true}
								placeholderTextColor='#949393'
								autoCapitalize='none'
								onChangeText={(value) => this.setState({ ConfirmPassword: value })}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<TouchableOpacity style={Styles.SignUpButton}>
								<Text style={Styles.ButtonText} onPress={this.HandleSignUp}>
									SignUp
								</Text>
							</TouchableOpacity>
						</View>

						<View style={Styles.LoginTextContainer}>
							<Text style={Styles.LoginText}>Already have an Account!  </Text>
							<TouchableOpacity>
								<Text
									style={Styles.LoginButton}
									onPress={() => this.props.navigation.navigate('DoctorLogin')}>
									Login
								</Text>
							</TouchableOpacity>
							<Text style={Styles.LoginText}>  Here.</Text>
						</View>
					</ScrollView>
				)}
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
		marginTop: 40
	},
	ErrorText: {
		color: 'red',
		fontSize: 16,
		fontWeight: "500",
		textAlign: 'center'
	},
	FormContainer: {
		flexGrow: 1,
		backgroundColor: '#fff',
		marginTop: 40
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
	SignUpButton: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		width: 150,
		marginVertical: 15,
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
	LoginTextContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginBottom: 200
	},
	LoginText: {
		color: 'black',
		fontSize: 20,
		fontWeight: "100"
	},
	LoginButton: {
		color: '#cf655b',
		fontSize: 26,
		fontWeight: "900",
		fontWeight: 'bold'
	}
});