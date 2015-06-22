chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    console.log("received request '" + request.method + "' from sender ", sender);
    if (request.method == "getSelection")
        sendResponse({
            data: window.getSelection().toString()
        });
    else {
        sendResponse({});
    }
});

console.log("content script running");
