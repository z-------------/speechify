chrome.extension.onRequest.addListener(function(request, sender, callback) {
    console.log("received request '" + request.method + "' from sender ", sender);
    if (request.method == "getSelection") {
        callback({
            data: window.getSelection().toString()
        });
    } else {
        callback(null);
    }
});

console.log("content script running");
