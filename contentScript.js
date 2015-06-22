chrome.extension.onRequest.addListener(function(request, sender, callback) {
    console.log("received request '" + request.method + "' from sender ", sender);
    if (request.method == "getTextInfo") {
        callback({
            text: window.getSelection().toString()
        });
    } else {
        callback(null);
    }
});

console.log("content script running");
