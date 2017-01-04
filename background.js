// chrome.tabs.create({
//     "url":"http://localhost:3000"
// });

console.log('loaded background script.');
 
function sayHello(port){ port.postMessage({greeting:"hello"}); }

function replyWithTabs(port){
	console.log(port);
	port.onMessage.addListener( (message, MessageSender, sendResponse) => {
		if(message === 'getTabs'){
			console.log('soon we will send some tabs');
			sendResponse(bookmarks);
		}
	});
}

const onConnect = chrome.runtime.onConnect;

onConnect.addListener(sayHello);
onConnect.addListener(replyWithTabs);
