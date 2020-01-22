import React from 'react';
import { Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import WebViewScreen from '../screens/WebViewScreen';
import ScanScreen from '../screens/ScanScreen';
import SettingScreen from '../screens/SettingScreen';
import { responsiveFontSize } from './../constants/Layout';

const MainTabNavigator = createStackNavigator(
	{
		WebView: {
			screen: WebViewScreen,
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

		Settings: {
			screen: SettingScreen,
			navigationOptions: ({ navigation }) => ({
				headerTitle: () => (
					<Text style={{ fontSize: responsiveFontSize({ min: 18, max: 32 }) }}>
						Settings
					</Text>
				),
			}),
		},
	},
	{
		initialRouteName: 'WebView',
	}
);

export default createAppContainer(MainTabNavigator);
