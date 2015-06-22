var startReading = function(text) {
    console.log("speechify reading: '" + text + "'");
    chrome.tts.speak(text);
};

var getTextInfo = function(tab, callback) {
    chrome.tabs.sendRequest(tab.id, { method: "getTextInfo" }, callback);
};

/* context menu */

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    getTextInfo(tab, function(response){
        startReading(response.text);
    });
});

chrome.contextMenus.create({
    title: "Speechify",
    contexts: ["selection"]
});

/* browser action */

chrome.browserAction.onClicked.addListener(function(tab) {
    getTextInfo(tab, function(response){
        startReading(response.text);
    });
});
