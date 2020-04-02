import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Label, Form, Picker } from 'native-base';
import { responsiveFontSize } from './../constants/Layout';

class SettingScreen extends React.PureComponent {
	componentDidMount() {
		this.setState({ urlValue: this.props.screenProps.webViewUrl });
	}

	onChangeUrl = value => {
		const { screenProps, navigation } = this.props;
		screenProps.setWebViewUrl(value);
		navigation.navigate('WebView');
	};

	renderPicker() {
		const { screenProps } = this.props;

		const items = screenProps.urls.map(url => {
			return (
				<Picker.Item key={url.name} label={url.name} value={url.address} />
			);
		});

		return (
			<Picker
				mode='dropdown'
				placeholder='Select One'
				selectedValue={screenProps.webViewUrl}
				onValueChange={this.onChangeUrl}
				textStyle={styles.pickerText}
				itemTextStyle={styles.itemTextStyle}>
				{items}
			</Picker>
		);
	}

	render() {
		const { screenProps } = this.props;

		return (
			<Form>
				<Item stackedLabel>
					<Label style={styles.label}>Connection</Label>
					<Input value={screenProps.network.type} disabled />
				</Item>
				<Item stackedLabel>
					<Label style={styles.label}>IP Address</Label>
					<Input value={screenProps.network.address} disabled />
				</Item>

				<Item stackedLabel>
					<Label style={styles.label}>Website</Label>
					{this.renderPicker()}
				</Item>
			</Form>
		);
	}
}

export const styles = StyleSheet.create({
	label: {
		opacity: 0.66,
	},
	pickerText: {
		width: '100%',
		marginLeft: -25,
	},
	itemTextStyle: {},
});

export default SettingScreen;
