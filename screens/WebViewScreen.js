import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import {
	FlingGestureHandler,
	Directions,
	State,
} from 'react-native-gesture-handler';
import { responsiveFontSize, spacing } from './../constants/Layout';

class WebViewScreen extends React.Component {
	state = {
		key: 1,
		isWebViewUrlChanged: false,
	};

	webView = null;

	componentDidMount() {
		this.props.screenProps.setWebViewRef(this.webView);
	}

	onMessage = event => {
		switch (event.nativeEvent.data) {
			case 'scan':
				this.props.navigation.navigate('Scan');
				break;
		}
	};

	resetWebViewToInitialUrl = () => {
		if (this.state.isWebViewUrlChanged) {
			this.setState({
				key: this.state.key + 1,
				isWebViewUrlChanged: false,
			});
		}
	};

	setWebViewUrlChanged = webviewState => {
		if (webviewState.url !== this.props.screenProps.webViewUrl) {
			this.setState({ isWebViewUrlChanged: true });
		}
	};

	render() {
		const { key } = this.state;
		const { navigation, screenProps } = this.props;

		return (
			<FlingGestureHandler
				numberOfPointers={2}
				direction={Directions.LEFT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.ACTIVE) {
						navigation.navigate('Settings');
					}
				}}>
				<View style={webViewStyles.container}>
					<WebView
						source={{
							uri: screenProps.webViewUrl,
						}}
						key={key}
						ref={ref => (this.webView = ref)}
						onMessage={this.onMessage}
						onNavigationStateChange={this.setWebViewUrlChanged}
						allowsBackForwardNavigationGestures={true}
						injectedJavaScript={injectedJavascript}
						cacheEnabled
						domStorageEnabled
						scalesPageToFit
					/>
					<Text
						onPress={this.resetWebViewToInitialUrl}
						style={webViewStyles.home}>
						Home
					</Text>
				</View>
			</FlingGestureHandler>
		);
	}
}

const injectedJavascript = `
    (function() {
        window.postMessage = function(data) {
            window.ReactNativeWebView.postMessage(data);
        };

        var scanTrigger = document.querySelector("[data-regstand-scan-trigger]");
        scanTrigger.addEventListener("click", function(e){
            e.preventDefault();
            window.postMessage("scan");
        });

        window.addEventListener("message", function(event) {

            var response = JSON.parse(event.data);

            switch (response.type) {
                case "scan":
                    var action = document.querySelector("[data-regstand-scan-action]");
                    var func = action.dataset.regstandScanAction;

                    if(typeof window[func] == 'function'){
                        window[func](response.data);
                    }
                break;
            }
        });
    })()
`;

const webViewStyles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 20,
	},
	home: {
		fontSize: responsiveFontSize({ min: 16, max: 26 }),
		padding: spacing.vertical.small,
		textAlign: 'center',
		backgroundColor: '#eee',
	},
});

export default WebViewScreen;
