import React, { Component } from 'react';
import { View, StyleSheet, Image } from 'react-native';

export default class Logo extends Component{
	render(){
		return(
			<View style={Styles.Container}>
				<Image 
				style={Styles.tinyLogo} 
				source={require('../Images/Logo.png')}
				/>
			</View>
		)
	}
}
const Styles=StyleSheet.create({
	tinyLogo: {
		width: 200,
		height: 150,
	},
	Container: {
		flexGrow:1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop:60,
	},
});