import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity, ActivityIndicator, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

import Logo from '../Components/Logo';

export default class InitialPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Loading: true,
			role: null
		};
	}

	componentDidMount = async () => {
		//this.props.navigation.navigate("InitialPage")
		try {
			this.setState({
				role: await AsyncStorage.getItem('UserRole')
			})
		} catch (e) {
		}
		firebase
			.auth()
			.onAuthStateChanged(User => {
				if (User) {
					firebase
						.database()
						.ref()
						.on('value', snap => {
							snap.forEach(child => {
								if (this.state.role == 'Patient' && child.key == 'PatientsList') {
									child.forEach(Patient => {
										if (User.uid == Patient.key) {
											console.log("Patient ka uid : ", Patient.key)
											this.setState({
												Loading: false
											})
											this.props.navigation.navigate("Home")
										}
										else {

										}
									})
								}
								else {
									child.forEach(Doctor => {
										if (User.uid == Doctor.key) {
											console.log("Doctor ka uid : ", Doctor.key)
											this.setState({
												Loading: false
											});
											this.props.navigation.navigate("DoctorPanel")
										}
										else {

										}
									})
								}
								// if (child.val().role == 'Doctor') {
								// 	this.setState({
								// 		Loading: false
								// 	});
								// 	this.props.navigation.navigate("DoctorPanel")
								// }
								// else if (child.val().role == 'Patient') {
								// 	this.setState({
								// 		Loading: false
								// 	});
								// 	this.props.navigation.navigate("Home")
								// }
							})
						});
				}
				else {
					this.setState({
						Loading: false
					});
				}
			})
		// if (this.state.role == "Patient") {
		// 	this.setState({
		// 		Loading:false,
		// 	});
		// 	this.props.navigation.navigate("Home")
		// }
		// else if (this.state.role == "Doctor") {
		// 	this.setState({
		// 		Loading:false,
		// 	});
		// 	this.props.navigation.navigate("DoctorPanel")
		// }
		// else {
		// 	this.setState({
		// 		Loading:false,
		// 	});
		// 	this.props.navigation.navigate("InitialPage")
		// }
	}

	render() {
		return (
			<View style={Styles.Container}>

				<Logo />
				<Modal
					visible={this.state.Loading}
					transparent={true}
				>
					<View style={Styles.ModalContainer}>
						<View style={Styles.ModalContent}>
							<Text>
								Loading...
							</Text>
							<ActivityIndicator color='#cf655b' size='large'></ActivityIndicator>
						</View>
					</View>
				</Modal>

				<View style={Styles.ButtonContainer}>
					<TouchableOpacity style={Styles.UserLoginButton} >
						<Text
							style={Styles.ButtonText}
							onPress={() => this.props.navigation.navigate('SignUp')}>
							I'm a Patient
					</Text>
					</TouchableOpacity>

					<TouchableOpacity style={Styles.DoctorLoginButton}>
						<Text
							style={Styles.ButtonText}
							onPress={() => this.props.navigation.navigate('DoctorSignUp')}>
							{/* onPress={() => this.props.navigation.navigate('Band')}> */}
							I'm a Doctor
					</Text>
					</TouchableOpacity>
				</View>
			</View>
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
	UserLoginButton: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		marginVertical: 10,
		paddingVertical: 20,
		alignSelf: 'center',
		width: 260
	},
	DoctorLoginButton: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		marginVertical: 4,
		paddingVertical: 20,
		alignSelf: 'center',
		width: 260
	},
	ButtonText: {
		fontSize: 24,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.9)',
		textAlign: 'center',
		paddingHorizontal: 20,
		paddingBottom: 5,
		fontWeight: 'bold'
	},
	ButtonContainer: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 350,
		marginTop: 80
	}
});