import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, CheckBox, ScrollView } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';

import Logo from '../../Components/Logo';
import KeyboardShift from '../../Components/KeyboardShift';

var Cholest = [
	{ label: "Normal", value: 1 },
	{ label: "Above Normal", value: 2 },
	{ label: "Way Above Normal", value: 3 },
];

var Gluc = [
	{ label: "Normal", value: 1 },
	{ label: "Above Normal", value: 2 },
	{ label: "Way Above Normal", value: 3 },
];

export default class PredictionPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			User: firebase.auth().currentUser.uid,
			Hi_BP: 0,
			Lo_BP: 0,
			Cholesterol: 0,
			Glucose: 0,
			DataAge: 0,
			DataGender: null,
			DataHeight: 0,
			DataWeight: 0,
			DataSmoker: null,
			DataAlcoholic: null,
			DataAcivity: null,
			FullName: "",
		};
	}

	async componentDidMount() {
		firebase
			.database()
			.ref('PatientsList/')
			.child(this.state.User)
			.on('value', snapshot => {
				var FirstName = (snapshot.val().FirstName);
				var LastName = (snapshot.val().LastName);
				var Gender = (snapshot.val().Gender);
				var Age = (snapshot.val().Age);
				var Height = (snapshot.val().Height);
				var Weight = (snapshot.val().Weight);
				var Smoker = (snapshot.val().Smoker);
				var Alcoholic = (snapshot.val().Alcohlic);
				var Activity = (snapshot.val().Activity);

				this.setState({
					FullName: FirstName + " " + LastName,
					DataGender: Gender,
					DataAge: Age,
					DataHeight: Height,
					DataWeight: Weight,
					DataSmoker: Smoker,
					DataAlcoholic: Alcoholic,
					DataAcivity: Activity,
				});
			});
	}


	HandleSubmit = () => {
		console.log("Something")
		const { Result } = this.state
		fetch('http://192.168.43.168:5000/api', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'mode': 'no-cors',
			},
			body: JSON.stringify({
				Age: this.state.DataAge,
				Gender: this.state.DataGender,
				Height: this.state.DataHeight,
				Weight: this.state.DataWeight,
				Ap_Hi: this.state.Hi_BP,
				Ap_Lo: this.state.Lo_BP,
				Cholesterol: this.state.Cholesterol,
				Gluc: this.state.Glucose,
				Smoke: this.state.DataSmoker,
				Alco: this.state.DataAlcoholic,
				Active: this.state.DataAcivity
			}),
		})
			.then((response) => response.json())
			.then(responseJson => {
				this.state.Result = responseJson
				console.log(responseJson)
				if (this.state.Result != null) {
					if (this.state.Result == 0) {
						alert("Congratulations! Keep up the good work, you have a healthy heart.")
						this.props.navigation.navigate("Home")
					}
					else if (this.state.Result == 1) {
						alert("Unfortunately, It seems like you need to consult a Doctor.")
						this.props.navigation.navigate("Appointment")
					}
					firebase
						.database()
						.ref("PatientsList/")
						.child(this.state.User)
						.update({
							Ap_Hi: this.state.Hi_BP,
							Ap_Lo: this.state.Lo_BP,
							GlucoseLevel: this.state.Glucose,
							Cholesterol: this.state.Cholesterol,
							HeartStatus: this.state.Result
						})
						.then(() => {
							//success callback
							console.log("Inserted")
							// this.props.navigation.navigate("Home")
						}).catch((error) => {
							//error callback
							console.log('error ', error)
						})
				}
				else {

				}
			})
			.catch(err => {
			});
	};

	render() {

		return (
			<KeyboardShift>
				{() => (
					<View style={Styles.Container}>

						<Logo />

						<View style={Styles.ErrorMessage}>
							{this.state.ErrorMessage && <Text style={Styles.ErrorText}>{this.state.ErrorMessage}</Text>}
						</View>

						<View style={Styles.FormContainer}>
							<TextInput style={Styles.InputBox}
								ref={(input) => { this.BPHighTextInput = input; }}
								keyboardType='numeric'
								placeholder='Blood Pressure (High)'
								placeholderTextColor='rgba(0,0,0,0.5)'
								onChangeText={(value) => this.setState({ Hi_BP: value })}
								value={this.state.Hi_BP}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
								onSubmitEditing={() => { this.BPLowTextInput.focus(); }}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.BPLowTextInput = input; }}
								keyboardType='numeric'
								placeholder='Blood Pressure (Low)'
								placeholderTextColor='rgba(0,0,0,0.5)'
								onChangeText={(value) => this.setState({ Lo_BP: value })}
								value={this.state.Lo_BP}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								options={[
									'Normal',
									'Above Normal',
									'Way Above Normal'
								]}
								defaultValue="Your Glucose level is"
								onSelect={(val) => { this.state.Glucose = val == 0 ? 1 : val == 1 ? 2 : 3 }}
							/>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								options={[
									'Normal',
									'Above Normal',
									'Way Above Normal'
								]}
								defaultValue="Your Cholesterol level is"
								onSelect={(val) => { this.state.Cholesterol = val == 0 ? 1 : val == 1 ? 2 : 3 }}
							/>

						</View>

						<TouchableOpacity style={Styles.SubmitButton}>
							<Text style={Styles.ButtonText} onPress={this.HandleSubmit}>
								Submit
								</Text>
						</TouchableOpacity>

					</View>
				)}
			</KeyboardShift>
		)
	}
}

const Styles = StyleSheet.create({
	Container: {
		backgroundColor: '#fff',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	DropdownTextStyle: {
		marginVertical: 8,
		width: 300,
		backgroundColor: '#d8d4d4',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 20,
		color: 'rgba(0,0,0,0.5)',
		paddingVertical: 10,
	},
	DropDownStyle: {
		marginVertical: -28,
		height: 145,
		borderRadius: 18,
		backgroundColor: '#d8d4d4'
	},
	DropdownListTextStyle: {
		width: 300,
		backgroundColor: '#d8d4d4',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 20,
		justifyContent: "center",
		alignItems: "center"
	},
	ErrorMessage: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	ErrorText: {
		color: 'red',
		fontSize: 16,
		fontWeight: "500",
		textAlign: 'center'
	},
	FormContainer: {
		flexGrow: 1,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: "center"
	},
	InputBox: {
		marginVertical: 8,
		width: 300,
		backgroundColor: '#d8d4d4',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 20,
		paddingVertical: 10,
		color: 'rgba(0,0,0,0.9)'
	},
	SubmitButton: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		width: 150,
		paddingVertical: 14,
		alignSelf: 'center',
		marginVertical: 145,
		justifyContent: "center"
	},
	ButtonText: {
		fontSize: 25,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.8)',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	// PredictionText: {
	// 	fontSize: 20,
	// 	fontWeight: '500',
	// 	color: 'rgba(255,255,255,0.9)',
	// 	textAlign: 'center',
	// 	paddingBottom: 100
	// }
});