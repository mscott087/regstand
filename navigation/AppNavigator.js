import React from 'react';
import MainNavigator from './MainNavigator';
import * as Permissions from 'expo-permissions';
import { StatusBar } from 'react-native';

class AppNavigator extends React.Component {
	static router = MainNavigator.router;

	state = {
		webView: null,
		webViewUrl: 'https://xpressreg.net/register/expo1219/landing.asp',
		cameraPermission: false,
	};

	componentDidMount() {
		StatusBar.setHidden(true);
	}

	async getCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setCameraPermission(status === Permissions.PermissionStatus.GRANTED);
	}

	setCameraPermission(permission) {
		this.setState({ cameraPermission: permission });
	}

	setWebViewRef(ref) {
		this.setState({ webView: ref });
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
