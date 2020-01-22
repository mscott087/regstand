import React from 'react';
import { Item, Input, Label, Form } from 'native-base';

class SettingScreen extends React.Component {
	state = {
		urlValue: '',
	};

	componentDidMount() {
		this.setState({ urlValue: this.props.screenProps.webViewUrl });
	}

	onBlurUrl = () => {
		const { urlValue } = this.state;
		const { screenProps, navigation } = this.props;

		if (urlValue !== '') {
			screenProps.setWebViewUrl(urlValue);
			navigation.pop();
		} else {
			this.setUrlValue(screenProps.webViewUrl);
		}
	};

	onChangeUrl = event => {
		this.setUrlValue(event.nativeEvent.text);
	};

	setUrlValue = url => {
		this.setState({ urlValue: url });
	};

	render() {
		const { urlValue } = this.state;
		const { screenProps } = this.props;

		return (
			<Form>
				<Item stackedLabel>
					<Label>Connection</Label>
					<Input value={screenProps.network.type} disabled />
				</Item>
				<Item stackedLabel>
					<Label>IP Address</Label>
					<Input value={screenProps.network.address} disabled />
				</Item>
				<Item stackedLabel>
					<Label>Website URL</Label>
					<Input
						value={urlValue}
						autoCapitalize={'none'}
						keyboardType={'url'}
						onBlur={this.onBlurUrl}
						onChange={this.onChangeUrl}
					/>
				</Item>
			</Form>
		);
	}
}

export default SettingScreen;
