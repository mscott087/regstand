import React from 'react';
import { View, Animated, Alert, Text } from 'react-native';
import { responsiveFontSize } from './../constants/Layout';
import { WebView } from 'react-native-webview';
import {
	PanGestureHandler,
	FlingGestureHandler,
	Directions,
	State,
} from 'react-native-gesture-handler';

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
		const { navigation, screenProps } = this.props;
		const { webViewUrl } = screenProps;

		return (
			<FlingGestureHandler
				numberOfPointers={2}
				direction={Directions.LEFT}
				onHandlerStateChange={({ nativeEvent }) => {
					if (nativeEvent.state === State.ACTIVE) {
						navigation.navigate('Settings');
					}
				}}>
				<View style={{ flex: 1, marginTop: 20 }}>
					<WebView
						key={this.state.key}
						onNavigationStateChange={this.setWebViewUrlChanged}
						bounces={false}
						ref={ref => (this.webView = ref)}
						source={{
							uri: webViewUrl,
						}}
						originWhitelist={['*']}
						javaScriptEnabled={true}
						injectedJavaScript={injectedJavascript}
						onMessage={this.onMessage}
						scalesPageToFit
						allowsBackForwardNavigationGestures={true}
					/>
					<Text
						onPress={this.resetWebViewToInitialUrl}
						style={{
							fontSize: responsiveFontSize({ min: 16, max: 32 }),
							padding: 30,
							textAlign: 'center',
							backgroundColor: '#eee',
						}}>
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

export default WebViewScreen;
