import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';

import AppNavigator from './navigation/AppNavigator';

export default function App(props) {
	return (
		<View style={styles.container}>
			{Platform.OS === 'ios' && (
				<StatusBar barStyle={'default'} hidden={'true'} />
			)}
			<AppNavigator />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
