import React from 'react';
import { StyleSheet } from 'react-native';
import { Item, Input, Label, Form, Picker } from 'native-base';
import { responsiveFontSize } from './../constants/Layout';

class SettingScreen extends React.Component {
	state = {
		urlValue: '',
	};

	componentDidMount() {
		this.setState({ urlValue: this.props.screenProps.webViewUrl });
	}

	onChangeUrl = value => {
		const { screenProps, navigation } = this.props;
		screenProps.setWebViewUrl(value);
		navigation.pop();
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
				selectedValue={this.state.urlValue}
				onValueChange={this.onChangeUrl}
				textStyle={styles.pickerText}
				itemTextStyle={styles.itemTextStyle}>
				{items}
			</Picker>
		);
	}

	render() {
		const { screenProps } = this.props;
		const picker = this.renderPicker();
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
					{picker}
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
		fontSize: responsiveFontSize({ min: 16, max: 32 }),
	},
	itemTextStyle: {
		fontSize: responsiveFontSize({ min: 16, max: 32 }),
		padding: 15,
	},
});

export default SettingScreen;
