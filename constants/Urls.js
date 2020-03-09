const domain = 'https://xpressreg.net';

export const WEBVIEW_URLS = [
	{
		key: 'WorkstationSetup',
		name: 'Workstation Setup',
		address: domain + '/register/expo1219/landing.asp',
	},
	{
		key: 'RegAdmin',
		name: 'Reg Admin',
		address: domain,
	},
];

export const DEFAULT_WEBVIEW_URL = WEBVIEW_URLS[0];

export default WEBVIEW_URLS;
