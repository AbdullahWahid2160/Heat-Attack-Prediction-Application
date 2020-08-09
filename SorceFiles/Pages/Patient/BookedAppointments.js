import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList, Image } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import KeyboardShift from '../../Components/KeyboardShift';
import Logo from '../../Components/Logo';

export default class BookedAppointments extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            WorkPlaceID: null,
            WorkPlaceName: null,
            AppointmentDay: null,
            WorkPlaceTimeFrom: null,
            WorkPlaceTimeTo: null,
            DoctorID: null,
            AppointmentID: null,
            PatientName: null,
            AppointmentStatus: null,
            ErrorMessage: null,
            ListofAppointments: [],
            dataretreived: false,
            NamesRetreived: false
        };
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

    componentDidMount() {
        var AppointsList = [];
        firebase
            .database()
            .ref('Appointments/')
            .on('value', snapshot => {
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val().PatientID == this.state.User && childSnapshot.val().Status == "Accepted") {
                        console.log("bhai jaan ye is doctor k against appointment pae jati hy accepted one : ", childSnapshot)
                        this.state.AppointmentID = childSnapshot.key
                        this.state.WorkPlaceID = childSnapshot.val().HospitalID
                        this.state.DoctorID = childSnapshot.val().DoctorID
                        this.state.AppointmentStatus = childSnapshot.val().Status
                        this.state.AppointmentDay = childSnapshot.val().Day
                        this.state.dataretreived = true
                        if (this.state.dataretreived == true) {
                            firebase
                                .database()
                                .ref('WorkPlaces/')
                                .child(this.state.WorkPlaceID)
                                .on('value', snap => {
                                    this.state.WorkPlaceName = snap.val().Name
                                    this.state.WorkPlaceTimeFrom = snap.val().From
                                    this.state.WorkPlaceTimeTo = snap.val().To
                                    this.state.NamesRetreived = true
                                    console.log("Hospital Name : ", this.state.WorkPlaceName)
                                });
                            firebase
                                .database()
                                .ref('DoctorsList/')
                                .child(this.state.DoctorID)
                                .on('value', snap => {
                                    this.state.DoctorName = snap.val().FirstName + " " + snap.val().LastName
                                    this.state.NamesRetreived = true
                                    console.log("Doctor Name : ", this.state.DoctorName)
                                })
                            AppointsList.push({ Hospitalname: this.state.WorkPlaceName, DoctorName: this.state.DoctorName, Appointmentstatus: this.state.AppointmentStatus })
                            this.setState({ ListofAppointments: AppointsList });
                            console.log("Appointments ki list : ", this.state.ListofAppointments)
                        }
                    }
                    else {

                    }
                });
            });

    }

    //handling onPress action  
    HandleAppointmentRequest = (item) => {
        console.log("ye loo g on click : ", item, this.state.AppointmentID)
        this.props.navigation.navigate("UpdateAppointmentRequests", {
            AppointmentID: this.state.AppointmentID,
            Appointmentstatus: this.state.AppointmentStatus,
            TimeFrom: this.state.WorkPlaceTimeFrom,
            TimeTo: this.state.WorkPlaceTimeTo,
            Day: this.state.AppointmentDay
        });
    }

    render() {

        return (
            <KeyboardShift>
                {() => (
                    <ScrollView contentContainerStyle={Styles.Container}>

                        <Logo />

                        <FlatList
                            style={Styles.ListStyle}
                            data={this.state.ListofAppointments}
                            renderItem={({ item }) =>
                                <TouchableOpacity onPress={this.HandleAppointmentRequest.bind(this, item)}>
                                    <Text style={Styles.ItemDoctor}>
                                        {item.DoctorName}
                                    </Text>
                                        <Image
                                            style={Styles.AlertIcon}
                                            source={require('../../Images/Alert.png')}
                                        />
                                    <Text style={Styles.ItemHospital}>
                                        {item.Hospitalname}
                                    </Text>
                                </TouchableOpacity>
                            }
                            ItemSeparatorComponent={this.renderSeparator}
                        />

                        <TouchableOpacity style={Styles.BookingAppointmentsButton} >
                            <Text
                                style={Styles.ButtonText}
                                onPress={() => this.props.navigation.navigate('Appointment')}>
                                Book New Appointment
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
        marginVertical: -25,
        height: 200,
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
    ListStyle: {
        marginTop: 70,
        borderRadius: 18,
        borderWidth: 4,
        borderColor: '#d8d4d4',
        width: 300,
        marginBottom: 285
    },
    ItemDoctor: {
        paddingTop: 5,
        paddingHorizontal: 20,
        fontSize: 23,
        width: 300,
        textAlign: 'left',
        color: 'rgba(0,0,0,0.9)',
        marginBottom: -15
    },
    ItemHospital: {
        paddingHorizontal: 20,
        fontSize: 18,
        width: 300,
        textAlign: 'left',
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        paddingBottom: 5,
        marginTop: -15
    },
    AlertIcon:{
        marginHorizontal:15,
        width:35,
        height:35,
        alignSelf:'flex-end',
    },
    BookingAppointmentsButton: {
        backgroundColor: "#cf655b",
        borderRadius: 25,
        padding: 14,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 100,
        marginBottom: 100,
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

BookedAppointments.PropTypes = {
    columns: PropTypes.number.isRequired,
};