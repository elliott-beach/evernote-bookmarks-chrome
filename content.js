// $.get("http://localhost:3000/create?title=Walrus&content=arkarkark");

//This line opens up a long-lived connection to your background page.
console.log('loaded content script');
const port = chrome.runtime.connect({name:"mycontentscript"});
// port.onMessage.addListener( (message,sender) => {
//   if(message.greeting === "hello"){
//     alert(message.greeting);
//   }
// });

port.postMessage('getTabs', (response) => {
	console.log(response);
}	