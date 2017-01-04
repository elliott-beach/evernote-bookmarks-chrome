// $.get("http://localhost:3000/create?title=Walrus&content=arkarkark");
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});