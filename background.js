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

const onConnect = chrome.runtime.onConnect;
onConnect.addListener(replyWithTabs);
