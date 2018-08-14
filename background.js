

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
    ]);
  });

chrome.omnibox.onInputEntered.addListener(
  function(text) {
  text = text.replace(/[־᠆‐‒–—―﹣－‑]+/gui,'-');
  text = text.toLowerCase().split(/[^a-z0-9-;,&~/]+/ig).join(".");
  text = text.replace(/([a-z])([0-9])/ig,"$1.$2");
  var serviceCall2 = 'http://scripture.guide/' + text;
    chrome.tabs.create({"url": serviceCall2});

  }); 

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({"url": "http://scripture.guide/random"});
});


chrome.contextMenus.create({"title": "Lookup “%s” in Scripture Guide", "contexts":["selection"],"onclick": function(info,tab){


  var text = info.selectionText.toLowerCase().split(" ").join(".");

  chrome.tabs.create({url: 'http://scripture.guide/' + text});

}});




chrome.contextMenus.create({"title": "Highlight References", "contexts":["page"],"onclick": function(info,tab){

  chrome.tabs.executeScript(null, {file: "linker.js"});

}});

