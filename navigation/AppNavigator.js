import React from 'react';
import MainNavigator from './MainNavigator';
import * as Permissions from 'expo-permissions';
import * as Network from 'expo-network';
import { StatusBar } from 'react-native';
import { WEBVIEW_URLS, DEFAULT_WEBVIEW_URL } from './../constants/Urls';

class AppNavigator extends React.Component {
	static router = MainNavigator.router;

	state = {
		network: {
			type: undefined,
			address: undefined,
			isConnected: undefined,
			isInternetReachable: undefined,
		},
		webViewRef: undefined,
		webViewUrl: DEFAULT_WEBVIEW_URL.address,
		cameraPermission: false,
	};

	componentDidMount() {
		StatusBar.setHidden(true);
		this.getNetwork();
	}

	async getNetwork() {
		const address = await Network.getIpAddressAsync();
		const network = await Network.getNetworkStateAsync();

		this.setState({
			network: { address: address, ...network },
		});
	}

	async getCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setCameraPermission(status === Permissions.PermissionStatus.GRANTED);
	}

	setCameraPermission(permission) {
		this.setState({ cameraPermission: permission });
	}

	setWebViewRef(ref) {
		this.setState({ webViewRef: ref });
	}

	setWebViewUrl(url) {
		this.setState({ webViewUrl: url });
	}

	render() {
		const { navigation } = this.props;
		return (
			<MainNavigator
				navigation={navigation}
				screenProps={{
					...this.state,
					urls: WEBVIEW_URLS,
					getNetwork: this.getNetwork.bind(this),
					getCameraPermission: this.getCameraPermission.bind(this),
					setCameraPermission: this.setCameraPermission.bind(this),
					setWebViewRef: this.setWebViewRef.bind(this),
					setWebViewUrl: this.setWebViewUrl.bind(this),
				}}
			/>
		);
	}
}

export default AppNavigator;
