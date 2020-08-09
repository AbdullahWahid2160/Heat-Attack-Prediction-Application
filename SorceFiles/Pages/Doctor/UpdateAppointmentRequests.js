import PropTypes from 'prop-types';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import KeyboardShift from '../../Components/KeyboardShift';

const StatusOptions = ['Approved', 'Declined'];

export default class UpdateAppointmentRequests extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            AppointmentId: this.props.route.params.AppointmentID,
            AppointmentStatus: this.props.route.params.Appointmentstatus,
            AppointmentDay: this.props.route.params.Day,
            From: this.props.route.params.TimeFrom,
            To: this.props.route.params.TimeTo,
            ErrorMessage: null,
        };
    }

    HandleAppointmentConfirmation = () => {
        firebase
            .database()
            .ref('Appointments/')
            .child(this.state.AppointmentId)
            .update({
                From: this.state.From,
                To: this.state.To,
                Status: this.state.AppointmentStatus
            })
            .then(() => {
                //success callback
                console.log("Updated")
                this.props.navigation.navigate("NewAppointmentRequests")
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
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

                        <View style={Styles.PickerStyle}>

                            <Text style={Styles.StatusTextStyle}>
                                {this.state.AppointmentStatus}
                            </Text>

                            <ModalDropdown
                                textStyle={Styles.DropdownTextStyle}
                                dropdownStyle={Styles.DropDownStyle}
                                dropdownTextStyle={Styles.DropdownListTextStyle}
                                options={StatusOptions}
                                defaultValue="Status"
                                onSelect={(val) => this.setState({ AppointmentStatus: StatusOptions[val] })}
                            />

                            <Text style={Styles.TextStyle}>
                                Appointment has been requested for
                                </Text>

                            <TextInput style={Styles.InputBox}
                                placeholder={this.state.AppointmentDay}
                                placeholderTextColor='rgba(0,0,0,0.8)'
                                autoCapitalize='words'
                                onChangeText={(value) => this.setState({ LastName: value })}
                                clearTextOnFocus={true}
                                enablesReturnKeyAutomatically={true}
                                editable={false}
                            />

                            <Text style={Styles.TextStyle}>
                                Appoint Time to the Patient from:
                                </Text>

                            <DatePicker
                                style={Styles.DatePicker1Style}
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

                            <Text style={Styles.ToTextStyle}>
                                to:
                                </Text>

                            <DatePicker
                                style={Styles.DatePicker2Style}
                                mode='time'
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

                            <TouchableOpacity style={Styles.Button}>
                                <Text style={Styles.ButtonText} onPress={this.HandleAppointmentConfirmation}>
                                    Submit
							        </Text>
                            </TouchableOpacity>

                        </View>

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
    StatusTextStyle: {
        color: '#cf655b',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center",
        marginBottom: 50
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
        textAlign: 'center'
    },
    DropDownStyle: {
        marginVertical: -28,
        height: 96,
        borderRadius: 18,
        backgroundColor: '#d8d4d4',
    },
    DropdownListTextStyle: {
        width: 300,
        backgroundColor: '#d8d4d4',
        borderRadius: 18,
        paddingHorizontal: 10,
        fontSize: 20,
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center"
    },
    TextStyle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginTop: 70
    },
    ToTextStyle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginTop: 5
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
        fontSize: 22,
        paddingVertical: 10,
        textAlign: 'center'
    },
    Button: {
        backgroundColor: "#cf655b",
        borderRadius: 25,
        width: 150,
        paddingVertical: 14,
        alignSelf: 'center',
        marginTop: 100,
        marginBottom: 50
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

UpdateAppointmentRequests.PropTypes = {
    columns: PropTypes.number.isRequired,
};