chrome.extension.onRequest.addListener(function(request, sender, callback) {
    console.log("received request '" + request.method + "' from sender ", sender);
    if (request.method == "getTextInfo") {
        var language;
        if (document.documentElement.getAttribute("lang")) {
            language = document.documentElement.getAttribute("lang");
        }

        callback({
            text: window.getSelection().toString(),
            language: language
        });
    } else {
        callback(null);
    }
});

console.log("content script running");
