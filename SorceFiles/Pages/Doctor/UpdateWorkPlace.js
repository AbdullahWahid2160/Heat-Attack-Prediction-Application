import PropTypes from 'prop-types';
import React, { useState, Component } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import SimpleReactValidator from 'simple-react-validator';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import { MultipleSelectPicker } from 'react-native-multi-select-picker'
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

export default class UpdateWorkPlaces extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            workplaceid: this.props.route.params.Id,
            Name: this.props.route.params.Name,
            days: this.props.route.params.Days,
            From: this.props.route.params.From,
            To: this.props.route.params.To,
            Days: [],
            WorkPlaceDays: [],
            ErrorMessage: null,
        };
    }

    // FieldsFilled = () => {
    //     const { Degree, Contact } = this.state
    //     if (Contact == "") {
    //         alert("Contact is required")
    //         return false
    //     }
    //     if (Degree == "") {
    //         alert("Degree is required")
    //         return false
    //     }
    //     return true
    // }

    HandleNext = () => {
        this.state.days.map((item) => { this.state.WorkPlaceDays.push(item.label) })
        firebase
            .database()
            .ref('WorkPlaces/')
            .child(this.state.workplaceid)
            .update({
                Days: this.state.WorkPlaceDays,
                From: this.state.From,
                To: this.state.To
            })
            .then(() => {
                //success callback
                console.log("Updated")
                this.props.navigation.navigate("DoctorWorkPlaces")
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })
    };

    HandleDeleteWorkplace=()=>{
        
    }

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

                            <Text style={Styles.WorkPlaceNameTextStyle}>
                                {this.state.Name}
                            </Text>

                            <Text style={Styles.TextStyle}>
                                Timings:
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

                            <Text style={Styles.TextStyle}>
                                Select your working days:
                                </Text>

                            <MultipleSelectPicker
                                items={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
                                onSelectionsChange={(days) => this.setState({ days: days })}
                                selectedItems={this.state.days}
                                style={{ backgroundColor: '#d8d4d4', alignSelf: 'center', marginVertical: 15, width: '100%', borderRadius: 18 }}
                                rowStyle={{ backgroundColor: '#d8d4d4', height: 50, borderRadius: 18, alignSelf: 'center' }}
                                labelStyle={{ fontSize: 20, paddingHorizontal: 20, color: 'rgba(0,0,0,0.6)' }}
                                checkboxStyle={{ display: 'none' }}
                                selectedLabelStyle={{ color: '#cf655b', fontWeight: 'bold' }}
                            />
                            <TouchableOpacity style={Styles.Button}>
                                <Text style={Styles.ButtonText} onPress={this.HandleNext}>
                                    Submit
							        </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={Styles.Button}>
                                <Text style={Styles.ButtonText} onPress={this.HandleDeleteWorkplace}>
                                    Remove
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
    WorkPlaceNameTextStyle: {
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        fontSize: 24,
        textAlign: "center"
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
    TextStyle: {
        fontSize: 20,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        marginTop: 20
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
        width: 150,
        paddingVertical: 14,
        alignSelf: 'center',
        marginVertical: 20
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
});

UpdateWorkPlaces.PropTypes = {
    columns: PropTypes.number.isRequired,
};