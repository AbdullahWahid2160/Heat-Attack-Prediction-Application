import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, ActivityIndicator, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import Card from '../../Components/Card';


export default class HomePage extends Component {

	constructor(props) {
		super(props)
		this.state = {
			FullName: "",
			User: firebase.auth().currentUser.uid,
			FirstTime: false,
			Img: '',
			Attention: "",
			HealthChecked: false,
			Status: null,
			Loading: true,
			role: null,
		};
	}

	componentDidMount = async () => {
		firebase
			.database()
			.ref('PatientsList/')
			.child(this.state.User)
			.on('value', snapshot => {
				var gender = snapshot.val().Gender;
				var status = snapshot.val().HeartStatus;
				var FirstName = snapshot.val().FirstName;
				var LastName = snapshot.val().LastName;
				if (FirstName != null) {
					this.state.Loading = false
					this.setState({
						FullName: FirstName + " " + LastName,
					});
				}
				if (gender == 2 || gender == 1) {
					this.state.FirstTime = false;
				}
				else {
					this.state.FirstTime = true;
				}
				if (status == "0" || status == "1") {
					this.state.HealthChecked = true;
				}
				else {
					this.state.HealthChecked = false;
				}
				if (this.state.FirstTime == true) {
					this.setState({
						Attention: "We noticed that You haven't \nset up your profile yet."
					});
				}
				else if (this.state.FirstTime == false) {
					if (this.state.HealthChecked == false) {
						this.setState({
							Attention: "We noticed that You haven't \nchecked your health status yet."
						});
					}
					else {
						if (status == 0) {
							this.setState({
								Attention: "It seems like you have a Good health status."
							});
						}
						else if (status == 1) {
							this.setState({
								Attention: "It seems like your health needs attention."
							});
						}
					}
				}
			});
	}

	HandlePrediction = () => {
		this.props.navigation.navigate('Prediction')
	};

	ManageAppointment = () => {
		this.props.navigation.navigate('BookedAppointments')
	};

	SetUpProfile = () => {
		this.props.navigation.navigate('Profile')
	};

	HandleLogOut = () => {
		firebase.auth().signOut();
		this.props.navigation.navigate("InitialPage")
	};

	render() {
		return (
			<ScrollView contentContainerStyle={Styles.Container}>

				<Modal
					visible={this.state.Loading}
					transparent={true}
				>
					<View style={Styles.ModalContainer}>
						<View style={Styles.ModalContent}>
							<Text>
								Home Loading...
							</Text>
							<ActivityIndicator color='#cf655b' size='large'></ActivityIndicator>
						</View>
					</View>
				</Modal>

				<Text style={Styles.WelcomeText}>Hi {this.state.FullName}! Welcome to HAP.</Text>

				<View style={Styles.WarningsContainer}>

					<Image
						style={Styles.warning}
						source={require('../../Images/Warning.png')}
					/>
					<Text style={Styles.WarningText}>
						{this.state.Attention}
					</Text>
				</View>

				<View style={Styles.CardsContainer1}>
					<TouchableOpacity onPress={this.HandlePrediction}>
						<Card>
							<Text style={Styles.ButtonText}>
								Check Health Status
							</Text>
						</Card>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.ManageAppointment}>
						<Card>
							<Text style={Styles.ButtonText}>
								Appointments
							</Text>
						</Card>
					</TouchableOpacity>
				</View>

				<View style={Styles.CardsContainer2}>
					<TouchableOpacity onPress={this.SetUpProfile}>
						<Card>
							<Text style={Styles.ButtonText}>
								Profile
							</Text>
						</Card>
					</TouchableOpacity>

					<TouchableOpacity onPress={this.HandleLogOut}>
						<Card>
							<Text style={Styles.ButtonText}>
								Logout
							</Text>
						</Card>
					</TouchableOpacity>
				</View>
			</ScrollView>
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
	WelcomeText: {
		marginTop: 150,
		fontSize: 20,
		color: 'black'
	},
	WarningsContainer: {
		flexDirection: 'row',
		marginBottom: 50,
		marginTop: 30,
		alignItems:"center",
		justifyContent:'center'
	},
	warning: {
		width: 40,
		height: 40
	},
	WarningText: {
		fontSize: 16
	},
	CardsContainer1: {
		flexDirection: "row",
		marginTop: 10
	},
	CardsContainer2: {
		flexDirection: "row",
		marginBottom: 250
	},
	ButtonText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#cf655b',
		textAlign: 'center',
		paddingBottom: 5
	},
});