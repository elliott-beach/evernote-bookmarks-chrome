// $.get("http://localhost:3000/create?title=Walrus&content=arkarkark");

console.log('loaded content script');

const port = chrome.runtime.connect();

port.postMessage('getTabs');

port.onMessage.addListener( (message) => {
	if (message.bookmarks){
		process(message.bookmarks);
	}
});

function process(bookmarks){
	console.log(bookmarks);
}