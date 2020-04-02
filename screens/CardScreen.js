import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CardIOModule } from 'react-native-awesome-card-io';

class CardScreen extends React.PureComponent {
	componentDidMount() {
		this.scanCard();
	}

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
		return <View style={styles.container}></View>;
	}
}

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default CardScreen;
