import React from 'react';
import { View, StyleSheet } from 'react-native';
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
		return this.props.screenProps.urls.filter(url => {
			return url.address === this.props.screenProps.webViewUrl;
		})[0];
	}

	onMessage = event => {
		switch (event.nativeEvent.data) {
			case 'scan':
				this.props.navigation.navigate('Scan');
				break;
		}
	};

	render() {
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
					{screenProps.urls.map(url => {
						return (
							<View
								style={[
									webViewStyles.container,
									{
										display:
											screenProps.webViewUrl === url.address ? 'flex' : 'none',
									},
								]}
								key={url.name}>
								<WebView
									source={{
										uri: url.address,
									}}
									ref={ref => (this[`webView${url.key}`] = ref)}
									onMessage={this.onMessage}
									allowsBackForwardNavigationGestures={true}
									injectedJavaScript={injectedJavascript}
									overScrollMode={'never'}
									domStorageEnabled
									scalesPageToFit
									sharedCookiesEnabled
								/>
							</View>
						);
					})}
				</View>
			</FlingGestureHandler>
		);
	}
}

const injectedJavascript = `
    (function() {

        var scanTrigger = document.querySelector("[data-regstand-scan-trigger]");
        scanTrigger.addEventListener("click", function(e){
            e.preventDefault();
            window.ReactNativeWebView.postMessage("scan");
        });

        var onMessage =  function(event) {

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
        }

        window.addEventListener("message", onMessage);
        document.addEventListener("message", onMessage);
    })()
`;

const webViewStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	home: {
		fontSize: responsiveFontSize({ min: 16, max: 26 }),
		padding: spacing.vertical.small,
		textAlign: 'center',
		backgroundColor: '#eee',
	},
});

export default WebViewScreen;
