// Chrome Extension Background Script - Manifest V3
// Handles omnibox, context menus, and icon clicks

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
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
    var serviceCall2 = 'https://scripture.guide/' + text;
    chrome.tabs.create({"url": serviceCall2});
  }); 

// Manifest V3: Use chrome.action instead of chrome.browserAction
chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({"url": "https://scripture.guide/random"});
});

// Context menu for selected text
chrome.contextMenus.create({
    "id": "lookup-selection",
    "title": "Lookup \"%s\" in Scripture Guide", 
    "contexts": ["selection"]
});

// Context menu for page highlighting
chrome.contextMenus.create({
    "id": "highlight-references",
    "title": "Highlight References", 
    "contexts": ["page"]
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "lookup-selection") {
        var text = info.selectionText.toLowerCase().split(" ").join(".");
        chrome.tabs.create({url: 'https://scripture.guide/' + text});
    } else if (info.menuItemId === "highlight-references") {
        // Inject the content script to highlight references
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['linker.js']
        });
    }
});

