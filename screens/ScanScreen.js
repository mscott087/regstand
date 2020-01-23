import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { responsiveFontSize, spacing } from './../constants/Layout';
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

		this.props.screenProps.webView.postMessage(response);
	};

	render() {
		const { showFrontCamera } = this.state;
		const { screenProps } = this.props;

		if (screenProps.cameraPermission) {
			return (
				<View style={[scanStyles.container, scanStyles.background]}>
					<TouchableWithoutFeedback onLongPress={this.toggleCamera}>
						<BarCodeScanner
							type={
								showFrontCamera
									? BarCodeScanner.Constants.Type.front
									: BarCodeScanner.Constants.Type.back
							}
							style={scanStyles.container}
							barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
							onBarCodeScanned={this.onScan}>
							<View style={scanStyles.container} />
							<TouchableOpacity
								onPress={this.closeScanner}
								style={scanStyles.cancelContainer}>
								<Text style={scanStyles.cancelText}>CANCEL</Text>
							</TouchableOpacity>
						</BarCodeScanner>
					</TouchableWithoutFeedback>
				</View>
			);
		} else {
			screenProps.getCameraPermission();
			return true;
		}
	}
}

export const scanStyles = StyleSheet.create({
	container: {
		flex: 1,
	},
	background: {
		backgroundColor: '#000',
	},
	cancelContainer: {
		backgroundColor: 'rgba(255,255,255,.1)',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,.6)',
		paddingHorizontal: spacing.horizontal.small,
		paddingVertical: spacing.vertical.small,
		margin: spacing.horizontal.medium,
		marginBottom: spacing.vertical.large,
		borderRadius: 10,
	},
	cancelText: {
		color: '#fff',
		textAlign: 'center',
		fontSize: responsiveFontSize({ min: 16, max: 26 }),
	},
});

export default ScanScreen;
