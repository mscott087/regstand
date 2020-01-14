import React from 'react';
import { WebView } from 'react-native-webview';

// regstand-scan-trigger [regstand-scan-trigger]
// regstand-scan-action window[func];

class RegistrationScreen extends React.Component {
	webview = null;

	componentDidMount() {
		this.props.screenProps.setWebViewRef(this.webview);
	}

	render() {
		const { navigation } = this.props;

		const injectedJavascript = `
            (function() {
                window.postMessage = function(data) {
                    window.ReactNativeWebView.postMessage(data);
                };

                document.querySelector("#FormOption3 img").onclick = function(e){
                    e.preventDefault();
                    window.postMessage("scan");
                };

                window.addEventListener("message", function(event) {

                    var response = JSON.parse(event.data);

                    switch (response.type) {
                        case "scan":

                            var field = document.querySelector("#BadgeOrder");
                            var form = document.querySelector("#FormOption3");
                            field.value = response.data;

                            form.submit();
                        break;
                    }
                });
            })()
        `;

		const onMessage = event => {
			switch (event.nativeEvent.data) {
				case 'scan':
					navigation.navigate('Scan');
					break;
			}
		};

		return (
			<WebView
				ref={ref => (this.webview = ref)}
				source={{
					uri: 'https://xpressreg.net/register/expo1219/landing.asp',
				}}
				originWhitelist={['*']}
				javaScriptEnabled={true}
				injectedJavaScript={injectedJavascript}
				onMessage={onMessage}
				scalesPageToFit
			/>
		);
	}
}

export default RegistrationScreen;
