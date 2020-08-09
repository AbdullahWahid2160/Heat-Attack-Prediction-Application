import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';

import KeyboardShift from '../../Components/KeyboardShift';
import Logo from '../../Components/Logo';

const WorkPlacesList = [
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



export default class NewAppointmentRequests extends Component {

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
            PatientID: null,
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
                    if (childSnapshot.val().DoctorID == this.state.User && childSnapshot.val().Status != "Approved") {
                        console.log("bhai jaan ye is doctor k against appointment pae jati hy : ", childSnapshot)
                        this.state.AppointmentID = childSnapshot.key
                        this.state.WorkPlaceID = childSnapshot.val().HospitalID
                        this.state.PatientID = childSnapshot.val().PatientID
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
                                .ref('PatientsList/')
                                .child(this.state.PatientID)
                                .on('value', snap => {
                                    this.state.PatientName = snap.val().FullName
                                    this.state.NamesRetreived = true
                                    console.log("Patient Name : ", this.state.PatientName)
                                })
                            AppointsList.push({ Hospitalname: this.state.WorkPlaceName, Patientname: this.state.PatientName, Appointmentstatus: this.state.AppointmentStatus })
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

    HandleNext = () => {
        // firebase
        //     .database()
        //     .ref('UsersList/')
        //     .child(this.state.User)
        //     .child('Workplaces')
        //     .child(this.state.WorkPlaceName)
        //     .set({
        //         Days:this.state.WorkPlaceDays,
        //         From:this.state.WorkPlaceTimeFrom,
        //         To:this.state.WorkPlaceTimeTo
        //     })
        //     .then(() => {
        //         //success callback
        //         console.log("Inserted")
        //         this.props.navigation.navigate("DoctorPanel")
        //     }).catch((error) => {
        //         //error callback
        //         console.log('error ', error)
        //     })
        // console.log("The workplace is : ", this.state.WorkPlaceName)
        this.props.navigation.navigate("AddWorkPlaces");
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
                                    <Text style={Styles.ItemPatient}>
                                        {item.Patientname}
                                    </Text>
                                    <Text style={Styles.ItemStatus}>
                                        {item.Appointmentstatus}
                                    </Text>
                                    <Text style={Styles.ItemHospital}>
                                        {item.Hospitalname}
                                    </Text>
                                </TouchableOpacity>
                            }
                            ItemSeparatorComponent={this.renderSeparator}
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
        marginTop: 50,
        borderRadius: 18,
        borderWidth: 4,
        borderColor: '#d8d4d4',
        width: 300,
        marginBottom: 565
    },
    ItemPatient: {
        paddingTop: 5,
        paddingHorizontal: 20,
        fontSize: 23,
        width: 300,
        textAlign: 'left',
        color: 'rgba(0,0,0,0.9)',
        marginBottom: -10
    },
    ItemHospital: {
        paddingHorizontal: 20,
        fontSize: 18,
        width: 300,
        textAlign: 'left',
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        paddingBottom: 5,
        marginTop: -10
    },
    ItemStatus: {
        paddingHorizontal: 20,
        fontSize: 17,
        width: 300,
        fontWeight: 'bold',
        textAlign: 'right',
        color: '#cf655b',
        paddingBottom: 5,
    },
    Button: {
        flexGrow: 1,
        backgroundColor: "#cf655b",
        borderRadius: 25,
        padding: 14,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 150,
        marginBottom: 200
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

NewAppointmentRequests.PropTypes = {
    columns: PropTypes.number.isRequired,
};