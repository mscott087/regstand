const domain = 'https://xpressreg.net';
const domainOnsite = 'https://onsite.xpressreg.local';

export const WEBVIEW_URLS = [
	{
		key: 'WorkstationSetup',
		name: 'Workstation Setup',
		address: domain + '/register/expo1219/landing.asp',
		javascript: `
            try{
                var cardTrigger = document.querySelector("[data-regstand-card-trigger]");
                var scanTrigger = document.querySelector("[data-regstand-scan-trigger]");

                if(cardTrigger){
                    cardTrigger.addEventListener("click", function(e){
                        e.preventDefault();
                        window.ReactNativeWebView.postMessage("card");
                    });
                }

                if(scanTrigger){
                    scanTrigger.addEventListener("click", function(e){
                        e.preventDefault();
                        window.ReactNativeWebView.postMessage("scan");
                    });
                }

                var onMessage =  function(event) {
                    var response = JSON.parse(event.data);

                    if(response.type){
                        switch (response.type) {
                            case "scan":
                                var action = document.querySelector("[data-regstand-scan-action]");
                                if(action){
                                    var func = action.dataset.regstandScanAction;

                                    if(typeof window[func] == 'function'){
                                        window[func](response.data);
                                    }
                                }
                                break;

                            case "card":

                                var fields = {
                                    cardNumber: document.querySelector("[data-regstand-card-number]"),
                                    cvv: document.querySelector("[data-regstand-card-cvv]"),
                                    month: document.querySelector("[data-regstand-card-month]"),
                                    year: document.querySelector("[data-regstand-card-year]")
                                }

                                var values = {
                                    cardNumber: response.data.cardNumber,
                                    cvv: response.data.cvv,
                                    month: (function(){
                                        var month = response.data.expiryMonth.toString();
                                        return month < 10 ? 0 + month : month;
                                    })(),
                                    year: response.data.expiryYear.toString().slice(-2)
                                }

                                if(fields.cardNumber){
                                    fields.cardNumber.value = values.cardNumber;
                                }

                                if(fields.cvv){
                                    fields.cvv.value = values.cvv;
                                }

                                if(fields.month){
                                    fields.month.value = values.month;
                                }

                                if(fields.year){
                                    fields.year.value = values.year;
                                }

                                break;
                        }
                    }
                }

                window.removeEventListener("message", onMessage);
                document.removeEventListener("message", onMessage);
                window.addEventListener("message", onMessage);
                document.addEventListener("message", onMessage);

            } catch(e) {
                window.ReactNativeWebView.postMessage("error");
            }
            true;
        `,
	},
	{
		key: 'RegAdmin',
		name: 'Reg Admin',
		address: domain,
		javascript: ``,
	},
	/*{
		key: 'WorkstationSetupOnsite',
		name: 'Workstation Setup (Onsite)',
		address: domainOnsite + '/admin_xp/onsite.asp',
	},
	{
		key: 'RegAdminOnsite',
		name: 'Reg Admin (Onsite)',
		address: domainOnsite + '/admin_xp/login.asp',
	},*/
];

export const DEFAULT_WEBVIEW_URL = WEBVIEW_URLS[0];

export default WEBVIEW_URLS;
