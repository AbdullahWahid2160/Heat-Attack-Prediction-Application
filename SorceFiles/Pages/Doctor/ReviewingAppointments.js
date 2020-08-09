import PropTypes from 'prop-types';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, TextInput } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import * as firebase from 'firebase';
import KeyboardShift from '../../Components/KeyboardShift';

const StatusOptions = ['Approved', 'Declined'];

export default class ReviewingApprovedAppointments extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            Prescription: null,
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
                Status: this.state.AppointmentStatus,
                Prescription: this.state.Prescription
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

                        <TextInput style={Styles.InputBox}
                            multiline={true}
                            placeholder="Prescription/Notes"
                            placeholderTextColor='#949393'
                            autoCapitalize='sentences'
                            onChangeText={(value) => this.setState({ Prescription: value })}
                            clearTextOnFocus={true}
                            enablesReturnKeyAutomatically={true}
                        />

                        <TouchableOpacity style={Styles.Button}>
                            <Text style={Styles.ButtonText} onPress={this.HandleAppointmentConfirmation}>
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

ReviewingApprovedAppointments.PropTypes = {
    columns: PropTypes.number.isRequired,
};