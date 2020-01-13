import React from 'react';
import MainNavigator from './MainNavigator';
import * as Permissions from 'expo-permissions';

class AppNavigator extends React.Component {
	static router = MainNavigator.router;

	state = {
		cameraPermission: false,
		webview: null,
	};

	async getCameraPermission() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setCameraPermission(status === Permissions.PermissionStatus.GRANTED);
	}

	setCameraPermission(permission) {
		this.setState({ cameraPermission: permission });
	}

	setWebViewRef(ref) {
		this.setState({ webview: ref });
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
				}}
			/>
		);
	}
}

export default AppNavigator;
