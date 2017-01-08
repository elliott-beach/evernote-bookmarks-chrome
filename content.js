console.log('loaded content script');

const config = require('config.json');
const HOSTNAME = config.HOSTNAME;

//creds to hgoebl -- http://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
function escapeXml(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

// creds to Martin Spier -- https://github.com/spiermar/bookmarks2evernote/blob/5b357f7b0efd8e2002b8a000cc06ffd39a09a854/bm2evernote.py#L15-L17
class Bookmark {
	constructor(title, url){
		this.title = escapeXml(title);
		this.url = escapeXml(url);
		// this.tag = tag;
		this.content = `<a href="${this.url}">${title}</a>`
		console.log(this.content);
	}

	create(){
		$.post(HOSTNAME+'/create', {
			title: this.title,
			content: this.content
		});
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
	// traverse({
	// 	title: 'Test Page',
	// 	url: 'https://url.with.ampersands?foo=bar&baz=bing'
	// });
}

// @TODO add ability to add tags based on bookmark tree.
function traverse(treeNode){
	if ( treeNode.children) {
		treeNode.children.forEach(traverse);
	} else {
		new Bookmark(treeNode.title, treeNode.url).create();
	}
}
