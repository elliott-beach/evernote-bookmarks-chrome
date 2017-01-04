
function createNote(title, content){
	$.get(`http://localhost:3000/create?title=${title}&content=${content}`);
}

console.log('loaded content script');

const port = chrome.runtime.connect();

port.postMessage('getBookmarks');

port.onMessage.addListener( (message) => {
	if (message.bookmarks){
		process(message.bookmarks);
	}
});

function process(bookmarks){
	console.log(bookmarks);
	bookmarks.forEach(traverse);
}

function isFolder(treeNode){}

// @TODO add ability to add tags based on bookmark tree.
function traverse(treeNode){

	if ( treeNode.children) {
		treeNode.children.forEach(traverse);
	} else {
		// @TODO get title of web page (description?)
		// createNote("bookmark", treeNode.url);
		console.log(treeNode.url);
	}

}