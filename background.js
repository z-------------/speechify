var startReading = function(text) {
    console.log("speechify reading: '" + text + "'");
    chrome.tts.speak(text);
};

/* context menu */

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.tabs.sendRequest(tab.id, { method: "getSelection" }, function(response){
        startReading(response.data);
    });
});

chrome.contextMenus.create({
    title: "Speechify",
    contexts: ["selection"]
});

/* browser action */

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.sendRequest(tab.id, { method: "getSelection" }, function(response){
        startReading(response.data);
    });
});
