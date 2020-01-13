import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import RegistrationScreen from '../screens/RegistrationScreen';
import ScanScreen from '../screens/ScanScreen';

const MainTabNavigator = createStackNavigator(
	{
		Registration: {
			screen: RegistrationScreen,
			navigationOptions: ({ navigation }) => ({
				header: null,
			}),
		},

		Scan: {
			screen: ScanScreen,
			navigationOptions: ({ navigation }) => ({
				header: null,
			}),
		},
	},
	{
		initialRouteName: 'Registration',
		defaultNavigationOptions: {
			headerStyle: {
				height: 65,
			},
		},
	}
);

export default createAppContainer(MainTabNavigator);
