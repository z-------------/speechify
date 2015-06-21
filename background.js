var startReading = function(selectedText) {
    chrome.tts.speak(selectedText);
};

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    chrome.tabs.sendRequest(tab.id, { method: "getSelection" }, function(response){
        startReading(response.data);
    });
});

chrome.contextMenus.create({
    title: "Start reading",
    contexts: ["selection"]
});
