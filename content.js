console.log('loaded content script');

// Weird characters in the title/url can cause problems.
// from http://stackoverflow.com/questions/7918868/how-to-escape-xml-entities-in-javascript
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

class Bookmark {
	constructor(title, url){
		this.title = escapeXml(title);
		this.url = escapeXml(url);
		this.content = `<a href="${this.url}">${this.title}</a>`
        this.jsonData = {
            title: this.title,
            content: this.content
        }
	}

	static create(bookmarks){

        // allow sending single bookmark
        if (! Array.isArray(bookmarks) ){
            bookmarks = [ bookmarks ];
        }

        // grab the info we care about
        const data = bookmarks.map( (b) => b.jsonData );

        // send teh post request
		$.ajax({
            type: 'post',
            url: config.HOSTNAME + '/create',
            data: JSON.stringify(data),
            contentType: "application/json; charset=utf-8",
            success: function(data){
                $(document.body).append('<p><em>Success!</em></p>')
            }
        })
        .fail( (xhr, status, error) => {
			console.log(xhr);
			console.log(status);
			console.log(error);
		})
	}
}


// wait for the background script to send us the bookmarks.
const port = chrome.runtime.connect();
port.onMessage.addListener( (message) => {
    if (message.bookmarks){
        process(message.bookmarks);
    }
});


function process(bookmarks){
	console.log(bookmarks);
    results = [];
	bookmarks.forEach( b => traverse(b, results));
    Bookmark.create(results);
}

// @TODO add ability to add tags based on bookmark tree.
function traverse(treeNode, results){
	if ( treeNode.children) {
		treeNode.children.forEach(traverse);
	} else {
		let bookmark = new Bookmark(treeNode.title, treeNode.url);
        results.push(bookmark);
	}
}


/*************************
BOOTSTRAP FUNCTIONS
*************************/


function main(){
	port.postMessage('getBookmarks');
}

function test(){
	// testing so many bookmarks is just painful, so I will use this.
    bookmark = new Bookmark('test', 'http://example.com');
	Bookmark.create([bookmark, bookmark]);
}

if (config.dryRun){
	test();
} else {
	main();
}


