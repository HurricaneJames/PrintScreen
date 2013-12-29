chrome.browserAction.onClicked.addListener(function(tab) {
  var url = chrome.extension.getURL("printScreen.js");
  var code = injectScript(url);

  chrome.tabs.executeScript(tab.id, {
    code: code,
    allFrames: true
  });
});

function injectScript(url) {
  return 'var script = document.createElement("script");' +
         'script.src = "' + url + '";' +
         '(document.head||document.documentElement).appendChild(script);'
}
