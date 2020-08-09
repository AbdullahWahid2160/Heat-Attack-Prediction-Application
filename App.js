import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-community/async-storage';

import * as firebase from 'firebase';

import InitialPage from './SorceFiles/Pages/InitialPage';
import LoginPage from './SorceFiles/Pages/Patient/Login';
import Profile from './SorceFiles/Pages/Patient/Profile';
import SignUpPage from './SorceFiles/Pages/Patient/SignUp';
import HomePage from './SorceFiles/Pages/Patient/Home';
import PredictionPage from './SorceFiles/Pages/Patient/PredictionPage';
import AppointmentPage from './SorceFiles/Pages/Patient/AppointmentPage';
import DoctorLogin from './SorceFiles/Pages/Doctor/DoctorLogin';
import DoctorSignUp from './SorceFiles/Pages/Doctor/DoctorSignUp';
import DoctorHome from './SorceFiles/Pages/Doctor/DoctorPanel';
import DoctorProfile from './SorceFiles/Pages/Doctor/DoctorProfile';
import WorkPlaces from './SorceFiles/Pages/Doctor/Workplaces';
import AddWorkPlaces from './SorceFiles/Pages/Doctor/AddWorkPlace';
import UpdateWorkPlaces from './SorceFiles/Pages/Doctor/UpdateWorkPlace';
import BookAppointment from './SorceFiles/Pages/Patient/BookAnAppointment';
import NewAppointmentRequests from './SorceFiles/Pages/Doctor/NewAppointmentRequests';
import UpdateAppointmentRequests from './SorceFiles/Pages/Doctor/UpdateAppointmentRequests';
import ScheduledApppointments from './SorceFiles/Pages/Doctor/ScheduledApppointments';
import BookedAppointments from './SorceFiles/Pages/Patient/BookedAppointments';
import ReviewingApprovedAppointments from './SorceFiles/Pages/Doctor/ReviewingAppointments';
import Band from './SorceFiles/Pages/Band';

var firebaseConfig = {
	apiKey: "AIzaSyD6lavyDVQ7EXch6PXeHx_OyTwJUvPajWU",
	authDomain: "mynewapp-87021.firebaseapp.com",
	databaseURL: "https://mynewapp-87021.firebaseio.com",
	projectId: "mynewapp-87021",
	storageBucket: "mynewapp-87021.appspot.com",
	messagingSenderId: "268251150672",
	appId: "1:268251150672:web:9579cc9b2bc089e7ab1455",
	measurementId: "G-Y6LBBWQFM3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

console.disableYellowBox = true;

const RoleStorage = 'UserRole';

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTransparent: {
						backgroundColor: 'transparent',
					},
					headerTitleStyle: {
						color: 'rgba(255,255,255,0.7)',
					},
				}}>
				<Stack.Screen options={{ headerShown: false }} name="InitialPage" component={InitialPage} />
				<Stack.Screen options={{ headerShown: false }} name="Band" component={Band} />
				<Stack.Screen options={{ headerShown: false }} name="Login" component={LoginPage} />
				<Stack.Screen options={{ headerShown: false }} name="Profile" component={Profile} />
				<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpPage} />
				<Stack.Screen options={{ headerShown: false }} name="Home" component={HomePage} />
				<Stack.Screen options={{ headerShown: false }} name="Appointment" component={AppointmentPage} />
				<Stack.Screen options={{ headerShown: false }} name="BookedAppointments" component={BookedAppointments} />
				<Stack.Screen options={{ headerShown: false }} name="Prediction" component={PredictionPage} />
				<Stack.Screen options={{ headerShown: false }} name="DoctorLogin" component={DoctorLogin} />
				<Stack.Screen options={{ headerShown: false }} name="DoctorSignUp" component={DoctorSignUp} />
				<Stack.Screen options={{ headerShown: false }} name="DoctorPanel" component={DoctorHome} />
				<Stack.Screen options={{ headerShown: false }} name="DoctorProfile" component={DoctorProfile} />
				<Stack.Screen options={{ headerShown: false }} name="DoctorWorkPlaces" component={WorkPlaces} />
				<Stack.Screen options={{ headerShown: false }} name="AddWorkPlaces" component={AddWorkPlaces} />
				<Stack.Screen options={{ headerShown: false }} name="UpdateWorkPlaces" component={UpdateWorkPlaces} />
				<Stack.Screen options={{ headerShown: false }} name="BookAnAppointment" component={BookAppointment} />
				<Stack.Screen options={{ headerShown: false }} name="NewAppointmentRequests" component={NewAppointmentRequests} />
				<Stack.Screen options={{ headerShown: false }} name="UpdateAppointmentRequests" component={UpdateAppointmentRequests} />
				<Stack.Screen options={{ headerShown: false }} name="ScheduledApppointments" component={ScheduledApppointments} />
				<Stack.Screen options={{ headerShown: false }} name="ReviewingApprovedAppointments" component={ReviewingApprovedAppointments} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default class NewApp extends Component {
	render() {
		return (
			<App />
		);
	}
}




