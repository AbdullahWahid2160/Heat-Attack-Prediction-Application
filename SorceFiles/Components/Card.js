import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Card(props) {
    return (
        <View style={Styles.CardContainer}>
            <View style={Styles.CardContent}>
                {props.children}
            </View>
        </View>   
    )
}

const Styles=StyleSheet.create({
    CardContainer:{
        borderRadius:10,
        backgroundColor:'#fff',
        elevation:5,
        shadowOffset:{width:1,height:1},
        shadowColor:'black',
        shadowOpacity:0.3,
        shadowRadius:1,
        marginVertical:7,
        marginHorizontal:7,
        width:180,
        height:180
    },
    CardContent:{
        marginVertical:'40%'
    }
})