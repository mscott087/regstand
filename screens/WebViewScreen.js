import React from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Constants } from 'react-native-unimodules';
import { WebView } from 'react-native-webview';
import {
	FlingGestureHandler,
	Directions,
	State,
} from 'react-native-gesture-handler';
import { responsiveFontSize, spacing } from './../constants/Layout';

class WebViewScreen extends React.PureComponent {
	componentDidMount() {
		this.updateWebViewRef();
	}

	componentDidUpdate(prevProps, prevState) {
		if (
			this.props.screenProps.webViewUrl !== prevProps.screenProps.webViewUrl
		) {
			this.updateWebViewRef();
		}
	}

	updateWebViewRef() {
		const currentUrl = this.getCurrentUrl();
		this.props.screenProps.setWebViewRef(this[`webView${currentUrl.key}`]);
	}

	getCurrentUrl() {
		const { screenProps } = this.props;
		let currentIndex = 0;

		screenProps.urls.find((url, index) => {
			if (url.address === screenProps.webViewUrl) {
				currentIndex = index;
			}
		});

		return {
			index: currentIndex,
			...screenProps.urls[currentIndex],
		};
	}

	onMessage = event => {
		switch (event.nativeEvent.data) {
			case 'scan':
				this.props.navigation.navigate('Scan');
				break;
			case 'card':
				this.props.navigation.navigate('Card');
				break;

			case 'error':
				Alert.alert('Error', 'There was an error with the injected JavaScript');
				break;
		}
	};

	render() {
		const { navigation, screenProps } = this.props;

		return (
			<FlingGestureHandler
				numberOfPointers={3}
				direction={Directions.LEFT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.ACTIVE) {
						let currentUrl = this.getCurrentUrl();
						let nextIndex =
							currentUrl.index === screenProps.urls.length - 1
								? 0
								: currentUrl.index + 1;
						screenProps.setWebViewUrl(screenProps.urls[nextIndex].address);
					}
				}}>
				<FlingGestureHandler
					numberOfPointers={2}
					direction={Directions.LEFT}
					onHandlerStateChange={({ nativeEvent }) => {
						if (nativeEvent.state === State.ACTIVE) {
							navigation.navigate('Settings');
						}
					}}>
					<View
						style={[
							styles.container,
							{ paddingTop: Constants.statusBarHeight },
						]}>
						{screenProps.urls.map(url => {
							return (
								<View
									style={[
										styles.container,
										{
											display:
												screenProps.webViewUrl === url.address
													? 'flex'
													: 'none',
										},
									]}
									key={url.name}>
									<WebView
										source={{
											uri: url.address,
										}}
										ref={ref => (this[`webView${url.key}`] = ref)}
										allowsBackForwardNavigationGestures={true}
										injectedJavaScript={url.javascript}
										onMessage={this.onMessage}
										scalesPageToFit
										showsHorizontalScrollIndicator={false}
										startInLoadingState
									/>
								</View>
							);
						})}
					</View>
				</FlingGestureHandler>
			</FlingGestureHandler>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default WebViewScreen;
