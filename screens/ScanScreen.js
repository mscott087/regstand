import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
} from 'react-native';
import { responsiveFontSize, spacing } from './../constants/Layout';
import { RNCamera } from 'react-native-camera';

class ScanScreen extends React.PureComponent {
	state = {
		showFrontCamera: false,
	};

	toggleCamera = () => {
		this.setState(state => {
			state.showFrontCamera = !state.showFrontCamera;
			return state;
		});
	};

	closeScanner = () => {
		this.props.navigation.navigate('WebView');
	};

	onScan = ({ type, data }) => {
		var response = JSON.stringify({
			type: 'scan',
			data: data,
		});

		this.props.screenProps.webViewRef.postMessage(response);

		this.closeScanner();
	};

	render() {
		const { showFrontCamera } = this.state;
		const { screenProps } = this.props;

		if (screenProps.cameraPermission) {
			return (
				<View style={[scanStyles.container, scanStyles.background]}>
					<TouchableWithoutFeedback onLongPress={this.toggleCamera}>
						<RNCamera
							type={
								showFrontCamera
									? RNCamera.Constants.Type.front
									: RNCamera.Constants.Type.back
							}
							style={scanStyles.container}
							barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
							onBarCodeRead={this.onScan}>
							<View style={scanStyles.container} />
							<TouchableOpacity
								onPress={this.closeScanner}
								style={scanStyles.cancelContainer}>
								<Text style={scanStyles.cancelText}>CANCEL</Text>
							</TouchableOpacity>
						</RNCamera>
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
