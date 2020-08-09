import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';

import KeyboardShift from '../../Components/KeyboardShift';

const HospitalsList = [
	'Ali Medical Hospital',
	'Rawal Hospital',
	'Complex',
	'Bilal Hospital',
	'Poly Clinic',
	'Ahmed Medical Centre',
	'Benazir Bhutto Hospital',
	'Al-Shifa Hospital',
	'Al-Maroof Hospital'
];

export default class AppointmentPage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			FirstName: '',
			FullName: "",
			User: firebase.auth().currentUser.uid,
			Doctors: [],
			SelectedHospital: "",
			RefreshFlatList: false,
			hospitalID: ""
		};
	}

	componentDidMount() {
		firebase
			.database()
			.ref('PatientsList/')
			.child(this.state.User)
			.on('value', snapshot => {
				this.state.Firstname = (snapshot.val().FirstName);
				var firstname = this.state.Firstname
				var LastName = (snapshot.val().LastName);
				this.setState({
					FullName: firstname + " " + LastName,
				});
			});
	}

	renderSeparator = () => {
		return (
			<View
				style={{
					height: 2,
					width: "100%",
					backgroundColor: "#d8d4d4",
				}}
			/>
		);
	};


	OnHospitalSelection = (val) => {
		this.state.SelectedHospital = HospitalsList[val]
		console.log("Jo Hospital Select kiya hy : ", this.state.SelectedHospital)
		this.AfterSelectingHospital();
	}

	AfterSelectingHospital = () => {
		this.state.RefreshFlatList = true;
		var doctorid = null;
		var DoctorList = [];
		firebase
			.database()
			.ref('WorkPlaces/')
			.on('value', snapshot => {
				snapshot.forEach(childSnapshot => {
					this.state.hospitalID = childSnapshot.key;
					var hospitalname = childSnapshot.val().Name;
					if (hospitalname == this.state.SelectedHospital) {
						this.state.RefreshFlatList = false;
						console.log("name: ", hospitalname)
						doctorid = childSnapshot.val().DoctorID;
						console.log("Ye ye doctors aye hain with selected hospital : ", doctorid)
						if (doctorid != null) {
							firebase
								.database()
								.ref('DoctorsList/')
								.child(doctorid)
								.on('value', snap => {
									DoctorList.push({ HospitalID: this.state.hospitalID, Degree: snap.val().Degree, FirstName: snap.val().FirstName, LastName: snap.val().LastName, Specialization: snap.val().Specialization })
								})
						}
					}
					else {
						this.state.Doctors = null;
						this.setState({
							RefreshFlatList: false,
						})
					}
				});
				this.setState({
					Doctors: DoctorList,
				});
				console.log("Doctors jo any chahiyain list main : ", this.state.Doctors)
			});
	}

	BookanAppointment = (item) => {
		console.log("is ki id bta jis ko touch kiya hy main ne : ", item.HospitalID)
		firebase
			.database()
			.ref('WorkPlaces/')
			.child(item.HospitalID)
			.on('value', snapshot => {
				this.props.navigation.navigate("BookAnAppointment", {
					DoctorName: item.FirstName + " " + item.LastName,
					DoctorID: snapshot.val().DoctorID,
					WorkplaceID: item.HospitalID,
					HospitalName: snapshot.val().Name,
					Days: snapshot.val().Days,
					From: snapshot.val().From,
					To: snapshot.val().To
				})
			})
	}

	render() {

		return (<KeyboardShift>
			{() => (
				<ScrollView contentContainerStyle={Styles.Container}>

					<Text style={Styles.TextStyling}>Welcome {this.state.FullName} !</Text>

					<ModalDropdown
						textStyle={Styles.DropdownTextStyle}
						dropdownStyle={Styles.DropDownStyle}
						dropdownTextStyle={Styles.DropdownListTextStyle}
						options={HospitalsList}
						defaultValue="Choose a Hospital"
						onSelect={(val) => this.OnHospitalSelection(val)}
					/>

					<FlatList
						style={Styles.ListStyle}
						data={this.state.Doctors}
						renderItem={({ item }) =>
							<TouchableOpacity onPress={this.BookanAppointment.bind(this, item)}>
								<Text style={Styles.ItemName}>
									{item.FirstName} {item.LastName}
								</Text>
								<Text style={Styles.ItemSpecialization}>
									{item.Specialization}
								</Text>
								<Text style={Styles.ItemDegree}>
									{item.Degree}
								</Text>
							</TouchableOpacity>
						}
						ItemSeparatorComponent={this.renderSeparator}
						refreshing={this.state.RefreshFlatList}
						onRefresh={this.AfterSelectingHospital}
					/>
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
		justifyContent: 'center'
	},
	TextContainer: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 300
	},
	TextStyling: {
		textDecorationColor: 'red',
		alignSelf: 'center',
		fontSize: 24,
		marginTop: 120,
		marginBottom: 50
	},
	ModalStyle: {
		marginBottom: 200
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
		flexGrow: 1,
		marginTop: -28,
		borderRadius: 18,
		backgroundColor: '#d8d4d4',
		height: 240
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
	ListStyle: {
		marginTop: 50,
		borderRadius: 18,
		borderWidth: 4,
		borderColor: '#d8d4d4',
		width: 300,
		marginBottom: 520
	},
	ItemName: {
		paddingTop: 5,
		paddingHorizontal: 20,
		fontSize: 24,
		width: 300,
		textAlign: 'left',
		color: 'rgba(0,0,0,0.9)',
	},
	ItemSpecialization: {
		paddingHorizontal: 20,
		fontSize: 18,
		width: 300,
		textAlign: 'left',
		color: 'rgba(0,0,0,0.5)',
		fontWeight: 'bold'
	},
	ItemDegree: {
		paddingHorizontal: 20,
		fontSize: 16,
		width: 300,
		textAlign: 'left',
		color: 'rgba(0,0,0,0.5)',
		paddingBottom: 5
	},
	Button: {
		backgroundColor: "#cf655b",
		borderRadius: 25,
		padding: 14,
		alignSelf: 'center',
		alignItems: "center",
		justifyContent: "center",
		marginTop: 80,
	},
	ButtonText: {
		fontSize: 25,
		fontWeight: '500',
		color: 'rgba(255,255,255,0.8)',
		textAlign: 'center',
		fontWeight: 'bold'
	},
});