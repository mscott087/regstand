import React from 'react';
import {
	View,
	StyleSheet,
	Button,
	Alert,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

class ScanScreen extends React.Component {
	state = {
		showFrontCamera: true,
	};

	toggleCamera = () => {
		this.setState(state => {
			state.showFrontCamera = !state.showFrontCamera;

			return state;
		});
	};

	closeScanner = () => {
		this.props.navigation.pop();
	};

	onScan = ({ type, data }) => {
		this.closeScanner();

		var response = JSON.stringify({
			data: data,
			type: 'scan',
		});

		this.props.screenProps.webview.postMessage(response);
	};

	render() {
		const { showFrontCamera } = this.state;
		const { cameraPermission, getCameraPermission } = this.props.screenProps;

		if (cameraPermission) {
			return (
				<View style={scanStyles.container}>
					<TouchableWithoutFeedback onLongPress={this.toggleCamera}>
						<BarCodeScanner
							type={
								showFrontCamera
									? BarCodeScanner.Constants.Type.front
									: BarCodeScanner.Constants.Type.back
							}
							style={scanStyles.container}
							onBarCodeScanned={this.onScan}>
							<View
								style={{
									flex: 1,
								}}
							/>
							<TouchableOpacity
								onPress={this.closeScanner}
								style={{
									backgroundColor: 'rgba(255,255,255,.1)',
									borderWidth: 1,
									borderColor: 'rgba(255,255,255,.6)',
									padding: 20,
									margin: 25,
									marginBottom: 50,
									borderRadius: 10,
								}}>
								<Button
									title='CANCEL'
									color='rgba(255,255,255,.6)'
									onPress={this.closeScanner}
								/>
							</TouchableOpacity>
						</BarCodeScanner>
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			getCameraPermission();
			return false;
		}
	}
}

export const scanStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	cancel: {
		bottom: 0,
	},
});

export default ScanScreen;
