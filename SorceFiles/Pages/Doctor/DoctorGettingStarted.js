import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import SegmentedPicker from 'react-native-segmented-picker';
import RadioForm from 'react-native-simple-radio-button';
import SimpleReactValidator from 'simple-react-validator';
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

export default class GetStarted extends Component {

	constructor(props) {
		super(props)
		this.validator = new SimpleReactValidator();
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
		};
		for (let i = 55; i <= 500; i++) {
			this.state.WeightsInLBs.push({ label: i });
		}
		for (let i = 55; i <= 500; i++) {
			this.state.WeightInKGs.push({ label: (i / 2.205).toFixed(2) });
		}
		for (let i = 2; i <= 7; i += 0.1) {
			this.state.HeightInCMs.push({ label: (i * 30.48).toFixed(2) });
		}
		for (let i = 2; i <= 7; i += 0.1) {
			this.state.HeightInFeet.push({ label: i.toFixed(1) });
		}
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
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month < 0 && Today.getDate() == BirthDay.getDate()) {
			age--
			month = 12 + month
			var monthdays = month * 30
			//console.log(age)
			//console.log(month)
			//console.log(day)
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
			//console.log(age)
			//console.log(month)
			//console.log(day)
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
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month === 0 && Today.getDate() == BirthDay.getDate()) {
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365
			this.setState({
				Age: ageindays
			})
		}
		else if (month === 0 && Today.getDate() > BirthDay.getDate()) {
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + month + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() > BirthDay.getDate()) {
			var monthdays = month * 30
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() < BirthDay.getDate()) {
			month--
			var monthdays = month * 30
			day = 30 + day
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		else if (month > 0 && Today.getDate() == BirthDay.getDate()) {
			var monthdays = month * 30
			//console.log(age)
			//console.log(month)
			//console.log(day)
			var ageindays = age * 365 + monthdays + day
			this.setState({
				Age: ageindays
			})
		}
		//console.log(this.state.Age)
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
			this.props.navigation.navigate('SignUp', {
				age: this.state.Age,
				gender: this.state.Gender,
				height: this.state.Height.column1,
				weight: this.state.Weight.column1,
				smoker: this.state.Smoker,
				alcohlic: this.state.Alcoholic,
				activity: this.state.Activity
			})
			console.log(this.state.Gender)
			console.log(this.state.Weight.column1)
			console.log(this.state.Age)
			console.log(this.state.Height.column1)
			console.log(this.state.Smoker)
			console.log(this.state.Alcoholic)
			console.log(this.state.Activity)
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
		//console.log(this.state.selections)
		//console.log("Weight:")
		//console.log(this.state.Weight.column1)
	};

	onHeightChange = (columnId, { label }) => {
		this.setState((prevState) => ({
			Height: {
				...prevState.Height,
				[columnId]: label
			},
		}));

		//console.log(this.state.selections)
		//console.log("Weight:")
		//console.log(this.state.Weight.column1)
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

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Genders}
								initial={-1}
								onPress={(gender) => this.setState({ Gender: gender })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 50, marginLeft: -15 }}
							/>
						</View>

						<DatePicker
							style={{ width: 250 }}
							mode='date'
							androidMode='spinner'
							date={this.state.Date}
							placeholder="Select Date of Birth"
							duration={30}
							format="YYYY-MM-DD"
							minDate="1947-01-01"
							maxDate="2020-01-01"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0
								},
								dateInput: {
									borderColor: 'rgba(255,255,255,0.2)',
									alignSelf: 'center',
									borderRadius: 18,
									marginLeft: 36,
								}
							}}
							// ... You can check the source to find the other keys.
							onDateChange={(date) => this.OnChangeDate(date)}
						/>

						<View style={Styles.FormContainer}>
							<SegmentedPicker
								ref={(input) => { this.weightpicker = input; }}
								//visible={true}
								options={{
									column1: this.state.WeightInKGs,
									column2: this.state.WeightsInLBs
								}}
								onValueChange={this.onWeightChange}
							/>

							<SegmentedPicker
								ref={(input) => { this.heightpicker = input; }}
								//visible={true}
								options={{
									column1: this.state.HeightInCMs,
									column2: this.state.HeightInFeet
								}}
								onValueChange={this.onHeightChange}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.WeightTextInput = input; }}
								placeholder='Weight'
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='none'
								showSoftInputOnFocus={false}
								onFocus={() => { this.weightpicker.show() }}
								value={this.state.Weight.column1}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>

							<TextInput style={Styles.InputBox}
								ref={(input) => { this.HeightTextInput = input; }}
								placeholder='Height (In cm)'
								placeholderTextColor='rgba(255,255,255,0.5)'
								autoCapitalize='none'
								showSoftInputOnFocus={false}
								onFocus={() => { this.heightpicker.show() }}
								value={this.state.Height.column1}
								clearTextOnFocus={true}
								enablesReturnKeyAutomatically={true}
							/>
						</View>

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Smoke}
								initial={-1}
								onPress={(smoke) => this.setState({ Smoker: smoke })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 39, marginLeft: 4 }}
							/>
						</View>

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Alcohol}
								initial={-1}
								onPress={(alcohol) => this.setState({ Alcoholic: alcohol })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 31, marginLeft: 12 }}
							/>
						</View>

						<View style={Styles.CheckBoxContainer}>
							<RadioForm
								radio_props={Active}
								initial={-1}
								onPress={(active) => this.setState({ Activity: active })}
								buttonSize={10}
								buttonColor={'teal'}
								selectedButtonColor={'teal'}
								labelColor={'rgba(255,255,255,0.8)'}
								selectedLabelColor={'rgba(255,255,255,0.8)'}
								formHorizontal={true}
								radioStyle={{ paddingHorizontal: 26, marginLeft: -25 }}
							/>
						</View>

						<TouchableOpacity style={Styles.Button}>
							<Text style={Styles.ButtonText} onPress={this.HandleNext}>
								Next
							</Text>
						</TouchableOpacity>

						<View style={Styles.LoginTextContainer}>
							<Text style={Styles.LoginText}>Already have an Account!  </Text>
							<TouchableOpacity>
								<Text
									style={Styles.LoginButton}
									onPress={() => this.props.navigation.navigate('Login')}>
									Login
								</Text>
							</TouchableOpacity>
							<Text style={Styles.LoginText}>  Here.</Text>
						</View>
					</View>
				)}
			</KeyboardShift>
		)
	}
}


const Styles = StyleSheet.create({
	Container: {
		backgroundColor: '#455a64',
		flexGrow: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	ErrorMessage: {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 20
	},
	ErrorText: {
		color: 'red',
		fontSize: 16,
		fontWeight: "500",
		textAlign: 'center'
	},
	FormContainer: {
		flexGrow: 1,
		marginBottom: 20
	},
	CheckBoxContainer: {
		flexGrow: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 22
	},
	InputBox: {
		marginVertical: 10,
		width: 300,
		backgroundColor: 'rgba(255,255,255,0.2)',
		borderRadius: 18,
		paddingHorizontal: 10,
		fontSize: 16,
		paddingVertical: 5
	},
	Button: {
		backgroundColor: "#1c313a",
		borderRadius: 25,
		width: 100,
		marginBottom: 20,
		paddingVertical: 10,
		alignSelf: 'center'
	},
	ButtonText: {
		fontSize: 20,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.8)',
		textAlign: 'center'
	},
	LoginTextContainer: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		marginBottom: 20
	},
	LoginText: {
		color: 'black',
		fontSize: 18,
		fontWeight: "100"
	},
	LoginButton: {
		color: '#ffffff',
		fontSize: 18,
		fontWeight: "900"
	}
});

GetStarted.PropTypes = {
	columns: PropTypes.number.isRequired,
};