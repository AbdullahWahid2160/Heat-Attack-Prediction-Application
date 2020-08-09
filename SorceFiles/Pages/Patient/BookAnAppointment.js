import PropTypes from 'prop-types';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import * as firebase from 'firebase';
import KeyboardShift from '../../Components/KeyboardShift';

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

export default class BookAppointment extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            DoctorName: this.props.route.params.DoctorName,
            DoctorID: this.props.route.params.DoctorID,
            WorkplaceID: this.props.route.params.WorkplaceID,
            HospitalName: this.props.route.params.HospitalName,
            days: this.props.route.params.Days,
            From: this.props.route.params.From,
            To: this.props.route.params.To,
            DOA: null,
            Day: null,
            WorkingDays: [],
            ErrorMessage: null,
        };
    }

    componentDidMount = () => {

    }

    BooktheAppointment = () => {
        if (this.state.Day != null) {
            firebase
                .database()
                .ref("Appointments/")
                .push()
                .set({
                    DoctorID: this.state.DoctorID,
                    PatientID: this.state.User,
                    HospitalID: this.state.WorkplaceID,
                    Day: this.state.Day,
                    Date: this.state.DOA,
                    TimeFrom: null,
                    TimeTo: null,
                    Status: "Pending"
                })
                .then(() => {
                    //success callback
                    console.log("Inserted")
                    this.props.navigation.navigate("Home")
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                })
        }
        else {
            alert("Please select a day")
        }
    };

    render() {
        const items = [
            { label: 'Monday', value: '1' },
            { label: 'Tuesday', value: '2' },
            { label: 'Wednesday', value: '3' },
            { label: 'Thursday', value: '4' },
            { label: 'Friday', value: '5' },
            { label: 'Saturday', value: '6' },
            { label: 'Sunday', value: '7' }
        ]

        const displayDays = false;

        return (
            <KeyboardShift>
                {() => (
                    <ScrollView contentContainerStyle={Styles.Container}>

                        <View style={Styles.nameview}>

                            <Text style={Styles.DoctorNameTextStyle}>
                                {this.state.DoctorName}
                            </Text>

                            <Text style={Styles.WorkPlaceNameTextStyle}>
                                {"("}
                                {this.state.HospitalName}
                                {")"}
                            </Text>

                        </View>

                        {/* <View style={Styles.ViewStyling1}>
                            <Text style={Styles.TextStyle}>
                                Date:
                            </Text>

                            <DatePicker
                                style={Styles.DatePicker0Style}
                                mode='date'
                                androidMode='spinner'
                                onDateChange={(val) => { this.setState({ DOA: val }) }}
                                minDate={moment().format("DD-MM-YYYY")}
                                date={this.state.DOA}
                                format="DD-MM-YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontSize: 20,
                                        color: 'rgba(0,0,0,0.7)'
                                    },
                                    dateIcon: {
                                        display: 'none'
                                    },
                                    placeholderText: {
                                        color: 'rgba(0,0,0,0.5)',
                                        fontSize: 20,
                                        paddingHorizontal: 20,
                                        alignSelf: 'flex-start'
                                    },
                                    dateInput: {
                                        borderRadius: 18,
                                        backgroundColor: '#d8d4d4',
                                        height: 45,
                                        fontSize: 25
                                    }
                                }}
                            />
                        </View> */}

                        <View style={Styles.ViewStyling2}>
                            <Text style={Styles.TextStyle}>
                                Timings:
                                    </Text>

                            <DatePicker
                                style={Styles.DatePicker1Style}
                                disabled={true}
                                mode='time'
                                androidMode='spinner'
                                placeholder={this.state.From}
                                onDateChange={(val) => { this.setState({ From: val }) }}
                                date={this.state.From}
                                format="h:mm a"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontSize: 20,
                                        color: 'rgba(0,0,0,0.7)'
                                    },
                                    dateIcon: {
                                        display: 'none'
                                    },
                                    placeholderText: {
                                        color: 'rgba(0,0,0,0.5)',
                                        fontSize: 20,
                                        paddingHorizontal: 20,
                                        alignSelf: 'flex-start'
                                    },
                                    dateInput: {
                                        borderRadius: 18,
                                        backgroundColor: '#d8d4d4',
                                        height: 45,
                                        fontSize: 25
                                    }
                                }}
                            />

                            <DatePicker
                                style={Styles.DatePicker2Style}
                                mode='time'
                                disabled={true}
                                androidMode='spinner'
                                onDateChange={(val) => { this.setState({ To: val }) }}
                                date={this.state.To}
                                placeholder={this.state.To}
                                format="h:mm a"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontSize: 20,
                                        color: 'rgba(0,0,0,0.7)'
                                    },
                                    dateIcon: {
                                        display: 'none'
                                    },
                                    placeholderText: {
                                        color: 'rgba(0,0,0,0.5)',
                                        fontSize: 20,
                                        paddingHorizontal: 20,
                                        alignSelf: 'flex-start'
                                    },
                                    dateInput: {
                                        alignSelf: 'center',
                                        borderRadius: 18,
                                        backgroundColor: '#d8d4d4',
                                        height: 45,
                                        fontSize: 25
                                    }
                                }}
                            />
                        </View>

                        <View style={Styles.ViewStyling3}>

                            <Text style={Styles.TextStyle}>
                                Select a suitable Day,
                            </Text>

                            <ModalDropdown
                                textStyle={Styles.DropdownTextStyle}
                                dropdownStyle={Styles.DropDownStyle}
                                dropdownTextStyle={Styles.DropdownListTextStyle}
                                options={this.state.days}
                                defaultValue="Choose a Day"
                                onSelect={(val) => { this.setState({ Day: this.state.days[val] }) }}
                            />

                        </View>

                        <TouchableOpacity style={Styles.Button}>
                            <Text style={Styles.ButtonText} onPress={this.BooktheAppointment}>
                                Confirm
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
    ViewStyling1: {
        flexGrow: 1,
        marginTop: 30,
    },
    ViewStyling2: {
        flexGrow: 1,
        marginTop: 40,
    },
    ViewStyling3: {
        flexGrow: 1,
        marginTop: 40,
    },
    nameview: {
        flexGrow: 1,
        marginTop: 80,
    },
    WorkPlaceNameTextStyle: {
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: "center",
        marginTop: 5
    },
    DoctorNameTextStyle: {
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        fontSize: 26,
        textAlign: "center",
    },
    PickerStyle: {
        flexGrow: 1,
        marginTop: 80,
        marginBottom: 80
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
        height: 200
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
    TextStyle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
    },
    DatePicker0Style: {
        width: 300,
        marginVertical: 8,
    },
    DatePicker1Style: {
        width: 300,
        marginVertical: 8,
    },
    DatePicker2Style: {
        width: 300,
        marginVertical: 8,
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
    Button: {
        backgroundColor: "#cf655b",
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 14,
        alignSelf: 'center',
        marginTop: 80,
        marginBottom: 80
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

BookAppointment.PropTypes = {
    columns: PropTypes.number.isRequired,
};