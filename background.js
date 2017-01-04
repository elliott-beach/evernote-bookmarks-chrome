console.log('loaded background script.');

function replyWithTabs(port){
	console.log(port);
	port.onMessage.addListener( (message, MessageSender) => {
		if(message === 'getTabs'){
			chrome.bookmarks.getTree( (tree) => {
				port.postMessage({bookmarks: tree});
			});
		}
	});
}

const onConnect = chrome.runtime.onConnect;
onConnect.addListener(replyWithTabs);
