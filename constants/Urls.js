const domain = 'https://xpressreg.net';
const domainOnsite = 'https://onsite.xpressreg.local';

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
	{
		key: 'WorkstationSetupOnsite',
		name: 'Workstation Setup (Onsite)',
		address: domainOnsite + '/admin_xp/onsite.asp',
	},
	{
		key: 'RegAdminOnsite',
		name: 'Reg Admin (Onsite)',
		address: domainOnsite + '/admin_xp/login.asp',
	},
];

export const DEFAULT_WEBVIEW_URL = WEBVIEW_URLS[0];

export default WEBVIEW_URLS;
