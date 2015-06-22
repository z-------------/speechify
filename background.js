var startReading = function(response) {
    var ttsOptions = {
        enqueue: true
    };
    var text = response.text;
    var splitLength = 200;
    var utterances = [];
    var words = text.split(" ");

    if (response.language) {
        ttsOptions.lang = response.language;
    }

    for (var w = 0; w < words.length; w++) {
        if (utterances.length === 0 || utterances[utterances.length - 1].length + words[w].length > splitLength) {
            utterances.push("");
            console.log(utterances, words[w]);
        }
        utterances[utterances.length - 1] += words[w] + " ";
    }

    console.log("speechify reading: '" + response.text + "' with options ", ttsOptions);
    console.log(utterances);

    utterances.forEach(function(text) {
        chrome.tts.speak(text, ttsOptions);
    });
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
