import React from 'react';
import { Container, Content, Item, Input, Label } from 'native-base';

class SettingScreen extends React.Component {
	state = {
		urlValue: '',
	};

	componentDidMount() {
		this.setState({ urlValue: this.props.screenProps.webViewUrl });
	}

	onBlur = () => {
		const { screenProps, navigation } = this.props;
		const { urlValue } = this.state;

		if (urlValue !== '') {
			screenProps.setWebViewUrl(urlValue);
			navigation.pop();
		} else {
			this.setState({ urlValue: screenProps.webViewUrl });
		}
	};

	onChange = event => {
		this.setState({ urlValue: event.nativeEvent.text });
	};

	onFocus = event => {
		this.setState({ urlValue: '' });
	};

	render() {
		const { urlValue } = this.state;

		return (
			<Container style={{ padding: 15 }}>
				<Content>
					<Item floatingLabel>
						<Label style={{ marginTop: 5 }}>Webview URL</Label>
						<Input
							value={urlValue}
							autoCapitalize={'none'}
							keyboardType={'url'}
							onFocus={this.onFocus}
							onBlur={this.onBlur}
							onChange={this.onChange}
						/>
					</Item>
				</Content>
			</Container>
		);
	}
}

export default SettingScreen;
