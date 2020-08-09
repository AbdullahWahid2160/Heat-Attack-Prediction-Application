import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import SegmentedPicker from 'react-native-segmented-picker';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';

import KeyboardShift from '../../Components/KeyboardShift';
import Logo from '../../Components/Logo';


var Genders = [
	{ label: "Male", value: 2 },
	{ label: "Female", value: 1 }
];

var Smoke = [
	{ label: "Smoker", value: 1 },
	{ label: "Non-Smoker", value: 0 }
];

var Alcohol = [
	{ label: "Alcoholic", value: 1 },
	{ label: "Non-Alcoholic", value: 0 }
];

var Active = [
	{ label: "Physically Active", value: 1 },
	{ label: "Inactive", value: 0 }
];

export default class Profile extends Component {

	constructor(props) {
		super(props)
		this.state = {
			Age: 0,
			Date: null,
			Gender: null,
			Height: 0,
			Weight: "",
			Smoker: null,
			Alocoholic: null,
			Activity: null,
			ErrorMessage: null,
			WeightInKGs: [],
			WeightsInLBs: [],
			HeightInCMs: [],
			HeightInFeet: [],
			User: firebase.auth().currentUser.uid
		};
		// for (let i = 55; i <= 500; i++) {
		// 	this.state.WeightsInLBs.push({ label: i });
		// }
		for (let i = 30; i <= 250; i += 1) {
			this.state.WeightInKGs.push({ label: (i).toFixed(0) });
		}
		for (let i = 120; i <= 220; i += 1) {
			this.state.HeightInCMs.push({ label: (i).toFixed(0) });
		}
		// for (let i = 2; i <= 7; i += 0.1) {
		// 	this.state.HeightInFeet.push({ label: i.toFixed(1) });
		// }
	}

	FieldsFilled = () => {
		const { Weight, Height } = this.state
		if (Weight == "") {
			alert("Weight is required")
			return false
		}
		if (Height == "") {
			alert("Height is required")
			return false
		}
		return true
	}

	CalculateAge = (date) => {
		var Today = new Date()
		var BirthDay = new Date(date)
		var age = Today.getFullYear() - BirthDay.getFullYear()
		var month = Today.getMonth() - BirthDay.getMonth()
		var day = Today.getDate() - BirthDay.getDate()
		if (month < 0 && Today.getDate() > BirthDay.getDate()) {
			age--
			month = 12 + month
			var monthdays = month * 30
			day = 30 - day
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month < 0 && Today.getDate() == BirthDay.getDate()) {
			age--
			month = 12 + month
			var monthdays = month * 30
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month < 0 && Today.getDate() < BirthDay.getDate()) {
			age--
			month--
			month = 12 + month
			var monthdays = month * 30
			day = 30 + day

			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month === 0 && Today.getDate() < BirthDay.getDate()) {
			age--
			month--
			month = 12 + month
			var monthdays = month * 30
			day = 30 + day

			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month === 0 && Today.getDate() == BirthDay.getDate()) {

			var ageindays = age * 365
			this.setState({
				Age: ageindays
			})
		}
		else if (month === 0 && Today.getDate() > BirthDay.getDate()) {

			var ageindays = age * 365 + month + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() > BirthDay.getDate()) {
			var monthdays = month * 30

			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() < BirthDay.getDate()) {
			month--
			var monthdays = month * 30
			day = 30 + day

			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() == BirthDay.getDate()) {
			var monthdays = month * 30

			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}

		return Age;
	}

	// 1997-10-16
	// 2020-05-09
	//
	// if  todayMonth < birthMonth then age-- = 22 (instead of 23)
	// and 
	// month value would be 05-10 = -5    means    12+(-5) = 7 months
	// and 
	// day value would be 
	// if  tadayDate < birthdate then 
	// 09-16 = 07 days 
	//
	//
	//
	// years would be Age = 2020-1997=23
	// but 23 would only be if its June of 2020 or greater than birthmonth,
	// which ultimately means 
	// if todaymonth-birthmonth < 0   
	// e.g, May-June  or  5-6 = -1 < 0
	// then it won't be 23 else it would be Age-- this is 23-- = 22 
	// and if todayMonth-birthmonth==0
	// and then inside if for days that 
	// if todayDate-BirthDate < 0
	// e.g, birthday = 1997-06-17     and     todayDate = 2020-06-15
	// then again 15-17 = -2 < 0
	// Age would still not be exact 23 but will be 22 
	// Now,
	// for calculating days 
	// first years of Age*365 would give just years but for being precise about month nd days, we would check the value for months in plus for like if birthday is 1997-03-16 and today is 2020-05-09
	// then Age = 2020-1997 = 23
	//      month = 05-03 = 2
	//      days = 09-16 = -7
	// ageindays = Age*365 + month*30 + days 

	OnChangeDate(date) {
		this.setState({
			Date: date
		})
		this.CalculateAge(this.state.Date)
	}

	HandleNext = () => {
		if (this.FieldsFilled() == true) {
			firebase
				.database()
				.ref('PatientsList/')
				.child(this.state.User)
				.update({
					Age: this.state.Age,
					Gender: this.state.Gender,
					Height: this.state.Height.column1,
					Weight: this.state.Weight.column1,
					Smoker: this.state.Smoker,
					Alcohlic: this.state.Alcoholic,
					Activity: this.state.Activity
				})
				.then(() => {
					this.props.navigation.navigate('Home')
				})
				.catch((error) => {
					//error callback

				})
		}
		else {

		}
	}

	onWeightChange = (columnId, { label }) => {
		this.setState((prevState) => ({
			Weight: {
				...prevState.Weight,
				[columnId]: label
			},
		}));

	};

	onHeightChange = (columnId, { label }) => {
		this.setState((prevState) => ({
			Height: {
				...prevState.Height,
				[columnId]: label
			},
		}));

	};

	render() {

		return (
			<KeyboardShift>
				{() => (
					<ScrollView contentContainerStyle={Styles.Container}>

						<Logo />

						<View style={Styles.FormContainer}>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								options={[
									'Male',
									'Female'
								]}
								defaultValue="Gender"
								onSelect={(val) => { this.state.Gender = val == 0 ? 2 : 1 }}
							/>

							<DatePicker
								style={Styles.DatePickerStyle}
								mode='date'
								androidMode='spinner'
								date={this.state.Date}
								placeholder="Select Date of Birth"
								duration={30}
								format="DD-MM-YYYY"
								minDate="01-01-1900"
								maxDate="01-01-2020"
								confirmBtnText="Confirm"
								cancelBtnText="Cancel"
								customStyles={{
									dateText: {
										fontSize: 20
									},
									placeholderText: {
										color: 'rgba(0,0,0,0.5)',
										fontSize: 20
									},
									dateIcon: {
										position: 'absolute',
										left: 0,
										alignItems: "center",
										marginLeft: 0,
										height: 45,
									},
									dateInput: {
										alignSelf: 'center',
										borderRadius: 18,
										marginLeft: 36,
										backgroundColor: '#d8d4d4',
										height: 45,
										fontSize: 25
									}
								}}
								// ... You can check the source to find the other keys.
								onDateChange={(date) => this.OnChangeDate(date)}
							/>

							<SegmentedPicker
								ref={(input) => { this.weightpicker = input; }}
								//visible={true}
								options={{
									column1: this.state.WeightInKGs,
								}}
								onValueChange={this.onWeightChange}
							/>

							<SegmentedPicker
								ref={(input) => { this.heightpicker = input; }}
								//visible={true}
								options={{
									column1: this.state.HeightInCMs,
								}}
								onValueChange={this.onHeightChange}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.WeightTextInput = input; }}
								placeholder='Weight (Kg)'
								placeholderTextColor='rgba(0,0,0,0.5)'
								autoCapitalize='none'
								showSoftInputOnFocus={false}
								onTouchEnd={() => { this.weightpicker.show() }}
								value={this.state.Weight.column1}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.HeightTextInput = input; }}
								placeholder='Height (cm)'
								placeholderTextColor='rgba(0,0,0,0.5)'
								autoCapitalize='none'
								showSoftInputOnFocus={false}
								onTouchEnd={() => { this.heightpicker.show() }}
								value={this.state.Height.column1}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								options={[
									'Non-Smoker',
									'Smoker'
								]}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								defaultValue="Do you smoke ?"
								onSelect={(val) => { this.state.Smoker = val }}
							/>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								options={[
									'Non-Alcoholic',
									'Alcoholic'
								]}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								defaultValue="Alcoholic ?"
								onSelect={(val) => { this.state.Alcoholic = val }}
							/>

							<ModalDropdown
								textStyle={Styles.DropdownTextStyle}
								options={[
									'Physically Inactive',
									'Physically Active'
								]}
								dropdownTextStyle={Styles.DropdownListTextStyle}
								dropdownStyle={Styles.DropDownStyle}
								defaultValue="Lifestyle ?"
								onSelect={(val) => { this.state.Activity = val }}
							/>
						</View>

						<TouchableOpacity style={Styles.Button}>
							<Text style={Styles.ButtonText} onPress={this.HandleNext}>
								Submit
								</Text>
						</TouchableOpacity>

					</ScrollView>
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
		marginVertical: 5,
		width: 300,
		backgroundColor: '#d8d4d4',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 20,
		color: 'rgba(0,0,0,0.5)',
		paddingVertical: 10,
	},
	DropDownStyle: {
		marginVertical: -33,
		height: 98,
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
	DatePickerStyle: {
		width: 300,
		marginVertical: 8,

	},
	FormContainer: {
		flexGrow: 1,
		marginBottom: -20
	},
	InputBox: {
		marginVertical: 5,
		width: 300,
		backgroundColor: '#d8d4d4',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 20,
		paddingVertical: 10,
		color: 'rgba(0,0,0,0.9)'
	},
	Button: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		width: 150,
		paddingVertical: 14,
		alignSelf: 'center',
		marginVertical: 80
	},
	ButtonText: {
		fontSize: 25,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.8)',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	// LoginTextContainer: {
	// 	flexDirection: 'row',
	// 	alignItems: 'flex-end',
	// 	justifyContent: 'center',
	// 	marginBottom: 20
	// },
	// LoginText: {
	// 	color: 'black',
	// 	fontSize: 18,
	// 	fontWeight: "100"
	// },
	// LoginButton: {
	// 	color: '#ffffff',
	// 	fontSize: 18,
	// 	fontWeight: "900"
	// }
});

Profile.PropTypes = {
	columns: PropTypes.number.isRequired,
};