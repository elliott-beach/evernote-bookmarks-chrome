console.log('loaded content script');

// creds to Martin Spier, https://github.com/spiermar/bookmarks2evernote/blob/5b357f7b0efd8e2002b8a000cc06ffd39a09a854/bm2evernote.py#L15-L17
class Bookmark {
	constructor(title, url){
		this.title = title;
		this.url = url;
		// this.tag = tag;
		this.content = `<a href="${url}">${title}</a>`
	}

	// @TODO change to post
	create(){
		$.get(`http://localhost:3000/create?title=${this.title}&content=${this.content}`);
	}
}


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

// @TODO add ability to add tags based on bookmark tree.
STOP = false
function traverse(treeNode){
	if(STOP) return;

	if ( treeNode.children) {
		treeNode.children.forEach(traverse);
	} else {
		// @TODO get title of web page (description?)
		new Bookmark(treeNode.title, treeNode.url).create();
		console.log(treeNode.url);
		STOP = true;
	}

}