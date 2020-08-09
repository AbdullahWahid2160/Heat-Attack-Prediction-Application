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



export default class WorkPlaces extends Component {

    constructor(props) {
        super(props)
        this.validator = new SimpleReactValidator();
        this.state = {
            User: firebase.auth().currentUser.uid,
            WorkPlaceName: null,
            WorkPlaceDays: "Monday",
            WorkPlaceTimeFrom: "4pm",
            WorkPlaceTimeTo: "6pm",
            ErrorMessage: null,
            ListofWorkPlaces: []
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
        firebase
            .database()
            .ref('WorkPlaces/')
            .on('value', snapshot => {
                var Workplaces = []
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.val().DoctorID == this.state.User) {
                        Workplaces.push({ Name: childSnapshot.val().Name, Key: childSnapshot.key });
                        this.setState({ ListofWorkPlaces: Workplaces })
                    }
                });
            });
    }

    //handling onPress action  
    UpdateDetails = (item) => {
        firebase
            .database()
            .ref('WorkPlaces/')
            .child(item.Key)
            .on('value', snapshot => {
                this.props.navigation.navigate("UpdateWorkPlaces", {
                    Id: snapshot.key,
                    Name: snapshot.val().Name,
                    Days: snapshot.val().Days,
                    From: snapshot.val().From,
                    To: snapshot.val().To
                })
            })
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

                        <TouchableOpacity style={Styles.Button}>
                            <Text style={Styles.ButtonText} onPress={this.HandleNext}>
                                Add a Workplace
							</Text>
                        </TouchableOpacity>

                        <FlatList
                            style={Styles.ListStyle}
                            data={this.state.ListofWorkPlaces}
                            renderItem={({ item }) =>
                                <Text style={Styles.Item}
                                    onPress={this.UpdateDetails.bind(this, item)}>
                                    {item.Name}
                                </Text>}
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
    ListStyle: {
        marginTop: 30,
        borderRadius: 18,
        borderWidth: 4,
        borderColor: '#d8d4d4',
        marginBottom:250,

    },
    Item: {
        padding: 20,
        fontSize: 22,
        width: 300,
        textAlign: 'center',
        color: 'rgba(0,0,0,0.5)',
        fontWeight: 'bold',
        lineHeight:20
    },
    Button: {
        flexGrow: 1,
        backgroundColor: "#cf655b",
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal:10,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
        marginBottom: 30
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

WorkPlaces.PropTypes = {
    columns: PropTypes.number.isRequired,
};