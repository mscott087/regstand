import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
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
					<View style={webViewStyles.container}>
						{screenProps.urls.map(url => {
							return (
								<View
									style={[
										webViewStyles.container,
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
										onMessage={this.onMessage}
										allowsBackForwardNavigationGestures={true}
										injectedJavaScript={injectedJavascript}
										overScrollMode={'never'}
										javaScriptEnabled={true}
										domStorageEnabled={true}
										sharedCookiesEnable={true}
										scalesPageToFit
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

const injectedJavascript = `
    try{
        var cardTrigger = document.querySelector("[data-regstand-card-trigger]");
        var scanTrigger = document.querySelector("[data-regstand-scan-trigger]");

        if(cardTrigger){
            cardTrigger.addEventListener("click", function(e){
                e.preventDefault();
                window.ReactNativeWebView.postMessage("card");
            });
        }

        if(scanTrigger){
            scanTrigger.addEventListener("click", function(e){
                e.preventDefault();
                window.ReactNativeWebView.postMessage("scan");
            });
        }

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

                case "card":

                    var fields = {
                        cardNumber: document.querySelector("[data-regstand-card-number]"),
                        cvv: document.querySelector("[data-regstand-card-cvv]"),
                        month: document.querySelector("[data-regstand-card-month]"),
                        year: document.querySelector("[data-regstand-card-year]")
                    }

                    var values = {
                        cardNumber: response.data.cardNumber,
                        cvv: response.data.cvv,
                        month: (function(){
                            var month = response.data.expiryMonth.toString();
                            return month < 10 ? 0 + month : month;
                        })(),
                        year: response.data.expiryYear.toString().slice(-2)
                    }

                    fields.cardNumber.value = values.cardNumber;
                    fields.cvv.value = values.cvv;
                    fields.month.value = values.month;
                    fields.year.value = values.year;

                    break;
            }
        }

        window.addEventListener("message", onMessage);
        document.addEventListener("message", onMessage);

    } catch(e) {
        window.ReactNativeWebView.postMessage("error");
    }
    true;
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
