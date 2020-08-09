import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import SimpleReactValidator from 'simple-react-validator';
import ModalDropdown from 'react-native-modal-dropdown';
import * as firebase from 'firebase';

import KeyboardShift from '../../Components/KeyboardShift';
import Logo from '../../Components/Logo';

export default class DoctorProfile extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            Age: 0,
            Date: null,
            Gender: null,
            ErrorMessage: null,
            Contact: "",
            Degree: "",
            Specialization: "",
            User: firebase.auth().currentUser.uid,
        };
    }

    SelectImage = async () => {
        console.log("Image Picker called!")
    }

    FieldsFilled = () => {
        const { Degree, Contact } = this.state
        if (Contact == "") {
            alert("Contact is required")
            return false
        }
        if (Degree == "") {
            alert("Degree is required")
            return false
        }
        return true
    }

    OnChangeDate(date) {
        this.setState({
            Date: date
        });
    }

    HandleSubmit = () => {
        if (this.FieldsFilled() == true) {
            firebase
                .database()
                .ref('DoctorsList/')
                .child(this.state.User)
                .update({
                    Gender: this.state.Gender,
                    DateOfBirth: this.state.Date,
                    Contact: this.state.Contact,
                    Degree: this.state.Degree,
                    Specialization: this.state.Specialization,
                })
                .then(() => {
                    //success callback
                    console.log("Inserted")
                    this.props.navigation.navigate("DoctorPanel")
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                })
        }
        else {

        }
    }

    render() {
        return (
            <KeyboardShift>
                {() => (
                    <ScrollView contentContainerStyle={Styles.Container}>

                        <Logo />

                        <View style={Styles.FormContainer}>

                            <ModalDropdown
                                textStyle={Styles.DropdownTextStyle}
                                dropdownStyle={Styles.DropDownStyle}
                                dropdownTextStyle={Styles.DropdownListTextStyle}
                                options={[
                                    'Male',
                                    'Female'
                                ]}
                                defaultValue="Gender"
                                onSelect={(val) => { this.state.Gender = val == 0 ? "Male" : "Female" }}
                            />

                            <DatePicker
                                style={Styles.DatePickerStyle}
                                mode='date'
                                androidMode='spinner'
                                date={this.state.Date}
                                placeholder="Select Date of Birth"
                                duration={30}
                                format="DD-MM-YYYY"
								minDate="01-01-1900"
								maxDate="01-01-2020"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateText: {
                                        fontSize: 20
                                    },
                                    placeholderText: {
                                        color: 'rgba(0,0,0,0.5)',
                                        fontSize: 20
                                    },
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        alignItems: "center",
                                        marginLeft: 0,
                                        height: 45,
                                    },
                                    dateInput: {
                                        alignSelf: 'center',
                                        borderRadius: 18,
                                        marginLeft: 36,
                                        backgroundColor: '#d8d4d4',
                                        height: 45,
                                        fontSize: 25
                                    }
                                }}
                                // ... You can check the source to find the other keys.
                                onDateChange={(date) => this.OnChangeDate(date)}
                            />

                            <TextInput style={Styles.InputBox}
                                keyboardType='numeric'
                                placeholder='Contact'
                                placeholderTextColor='rgba(0,0,0,0.5)'
                                onChangeText={(value) => this.setState({ Contact: value })}
                                clearTextOnFocus={true}
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <TextInput style={Styles.InputBox}
                                placeholder='Degree'
                                placeholderTextColor='rgba(0,0,0,0.5)'
                                autoCapitalize='words'
                                onChangeText={(value) => this.setState({ Degree: value })}
                                clearTextOnFocus={true}
                                enablesReturnKeyAutomatically={true}
                                onSubmitEditing={() => { this.secondTextInput.focus(); }}
                            />

                            <TextInput style={Styles.InputBox}
                                ref={(input) => { this.secondTextInput = input; }}
                                placeholder='Specialization'
                                placeholderTextColor='rgba(0,0,0,0.5)'
                                autoCapitalize='words'
                                onChangeText={(value) => this.setState({ Specialization: value })}
                                clearTextOnFocus={true}
                                enablesReturnKeyAutomatically={true}
                            />

                        </View>

                        <TouchableOpacity style={Styles.Button}>
                            <Text style={Styles.ButtonText} onPress={this.HandleSubmit}>
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
        height: 98,
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
    },
    InputBox: {
        marginVertical: 5,
        width: 300,
        backgroundColor: '#d8d4d4',
        borderRadius: 18,
        paddingHorizontal: 10,
        fontSize: 20,
        paddingVertical: 10,
        color: 'rgba(0,0,0,0.9)'
    },
    Button: {
        backgroundColor: "#cf655b",
        borderRadius: 25,
        width: 150,
        paddingVertical: 14,
        alignSelf: 'center',
        marginBottom: 100,
        marginTop: 20
    },
    ButtonText: {
        fontSize: 25,
        fontWeight: '500',
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    // LoginTextContainer: {
    // 	flexDirection: 'row',
    // 	alignItems: 'flex-end',
    // 	justifyContent: 'center',
    // 	marginBottom: 20
    // },
    // LoginText: {
    // 	color: 'black',
    // 	fontSize: 18,
    // 	fontWeight: "100"
    // },
    // LoginButton: {
    // 	color: '#ffffff',
    // 	fontSize: 18,
    // 	fontWeight: "900"
    // }
});

DoctorProfile.PropTypes = {
    columns: PropTypes.number.isRequired,
};