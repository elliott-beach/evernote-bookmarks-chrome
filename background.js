console.log('loaded background script.');

function replyWithTabs(port){
	port.onMessage.addListener( (message) => {
		if(message === 'getBookmarks'){
			chrome.bookmarks.getTree( (tree) => {
				port.postMessage({bookmarks: tree});
			});
		}
	});
}

function login(){
	const url = config.HOSTNAME + '/auth';
	chrome.tabs.create( { url } );
}

const onConnect = chrome.runtime.onConnect;
onConnect.addListener(replyWithTabs);

// when script loads, log in @TODO change to on button presss
login();
