import React from 'react';
import {
	View,
	TouchableOpacity,
	Text,
	Platform,
	StyleSheet,
	Alert,
	processColor,
} from 'react-native';
import {
	CardIOModule,
	CardIOUtilities,
	CardIOView,
} from 'react-native-awesome-card-io';
import { Item, Input, Label, Form, Picker } from 'native-base';
import { responsiveFontSize } from './../constants/Layout';

class CreditCardScreen extends React.Component {
	closeScanner() {
		this.props.navigation.navigate('WebView');
	}

	scanCard = async () => {
		const card = await CardIOModule.scanCard({
			hideCardIOLogo: true,
		})
			.then(card => {
				var response = JSON.stringify({
					type: 'card',
					data: card,
				});
				this.props.screenProps.webViewRef.postMessage(response);
				this.closeScanner();
			})
			.catch(() => {
				this.closeScanner();
			});
	};

	render() {
		this.scanCard();
		return <View style={{ flex: 1 }}></View>;
	}
}

export const styles = StyleSheet.create({});

export default CreditCardScreen;
