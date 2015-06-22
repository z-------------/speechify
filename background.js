var startReading = function(response) {
    var ttsOptions = {};
    if (response.language) {
        ttsOptions.lang = response.language;
    }

    chrome.tts.speak(response.text, ttsOptions);

    console.log("speechify reading: '" + response.text + "' with options ", ttsOptions);
};

var getTextInfo = function(tab, callback) {
    chrome.tabs.sendRequest(tab.id, { method: "getTextInfo" }, callback);
};

/* context menu */

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    getTextInfo(tab, function(response){
        startReading(response);
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
