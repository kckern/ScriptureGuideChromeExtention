// Import scripture-guide package
import { detectReferences, setLanguage } from 'scripture-guide';

// Set default language
setLanguage('en');

var startTime = new Date().getTime();

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet')
link.setAttribute('type', 'text/css')
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Kreon')
document.getElementsByTagName('head')[0].appendChild(link)

//Add Styles using individual style properties (CSP compliant)
var style = document.createElement('style');
style.textContent = "a.sg_autolink:link{ " +
	"color:black!important; " +
	"font-family: 'Kreon'; " +
	"text-decoration:none!important; " +
    "border-radius:4px; " +
	"border:1px dotted #552B1B; " +
	"padding: 0 .5em 0 .5em; " +
	"background-color:#f2e5d9; }" +
"a.sg_autolink:hover{ " +
	"text-decoration:none!important; " +
	"border-bottom:1px solid #552B1B; " +
    "color:#552B1B!important; " +
	"background-color:#f2e5d9; }" +
"a.sg_autolink:visited{ " +
	"color:black!important; }";
document.getElementsByTagName('head')[0].appendChild(style)

//Add Popup Functions directly to window object
window.sgshow = function(el) {
    window.PopupCenter(el.href, "Scripture Guide", 1000, 750);
    return false;
};

window.PopupCenter = function(url, title, width, height) {
    var left = window.screenLeft !== undefined ? window.screenLeft : screen.left;
    var top = window.screenTop !== undefined ? window.screenTop : screen.top;
    var screenWidth = window.innerWidth ? window.innerWidth : 
        document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var screenHeight = window.innerHeight ? window.innerHeight : 
        document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
    
    var x = (screenWidth / 2) - (width / 2) + left;
    var y = (screenHeight / 2) - (height / 2) + top;
    
    var popup = window.open(url, title, 
        "scrollbars=yes, width=" + width + ", height=" + height + ", top=" + y + ", left=" + x);
    
    if (window.focus && popup) {
        popup.focus();
    }
    return false;
};

var excludes = [
    "lds.org/scriptures",
    "biblehub",
    "biblegateway",
    "wikisource",
    "ebible",
    "goto-scrip",
    "scriptures.lds.org",
    "kckern.info",
    "publications/bible",
    "lecturesonfaith.com",
    "isaiahexplained.com",
    "scripture.guide"
];

var a_elements = document.getElementsByTagName('a');
var elements = document.querySelectorAll('div,span,blockquote,p,li,td,a,strong,em,label,b,strong,i,dd,cite,h1,h2,h3,h4,h5,h6')
var runme = true;

//Override built-in scripture links with SG links (instead of just adding a link icon)
for (var i = 0; i < a_elements.length; i++) {
    //Remove all Links
    if (a_elements[i].getAttribute("href") == null) continue;

    if (a_elements[i].getAttribute("href").match(excludes.join("|"))) {
        var content = document.createTextNode(a_elements[i].textContent);

        //dont mess with links that dont have a number in them
        if (a_elements[i].getAttribute("href").match(/[0-9]/)==null) continue;
        if (content.textContent.match(/[0-9]/)==null) continue;

        a_elements[i].parentNode.insertBefore(content, a_elements[i]);
        a_elements[i].parentNode.removeChild(a_elements[i]);
        i--;
    }
}

if (runme) {
    var batchSize = 10; // Reasonable batch size
    var currentIndex = 0;
    var processingTimeout = 100; // Longer delay to prevent freezing
    
    // Filter elements more efficiently - only text-heavy elements
    var elementsToProcess = [];
    var allElements = document.querySelectorAll('p, div, span, li, td, blockquote, cite, h1, h2, h3, h4, h5, h6');
    
    for (var i = 0; i < allElements.length; i++) {
        var el = allElements[i];
        if (!el.getAttribute("sg-flag") && el.textContent && el.textContent.length > 10) {
            elementsToProcess.push(el);
        }
    }
    
    function processBatch() {
        var processed = 0;
        var startTime = Date.now();
        
        while (currentIndex < elementsToProcess.length && processed < batchSize) {
            var element = elementsToProcess[currentIndex];
            currentIndex++;
            
            // Skip if element is no longer in DOM or already processed
            if (!document.contains(element) || element.getAttribute("sg-flag")) {
                continue;
            }
            
            // Quick check for existing links
            if (element.querySelector('.sg_autolink')) {
                element.setAttribute("sg-flag", "true");
                continue;
            }
            
            var originalHTML = element.innerHTML;
            
            // Skip very large elements to prevent slowdown
            if (originalHTML.length > 5000) {
                element.setAttribute("sg-flag", "true");
                continue;
            }
            
            // Skip elements that look like they contain CSS classes or complex HTML
            if (originalHTML.indexOf('class="text-') > -1 || 
                originalHTML.indexOf('hover:') > -1 ||
                originalHTML.indexOf('focus-visible') > -1) {
                element.setAttribute("sg-flag", "true");
                continue;
            }
            
            try {
                var processedHTML = detectReferences(originalHTML, function(reference) {
                    var link = reference.trim().toLowerCase().replace(/[\s:]+/g, '.').replace(/\.+/g, '.').replace(/;\./g, ';').replace(/,\./g, ',');
                    return '<a class="sg_autolink" sg-flag="true" href="https://scripture.guide/' + link + '" target="_blank">' + reference + '</a>';
                });

                if (processedHTML !== originalHTML) {
                    // Final safety check before setting innerHTML
                    if (processedHTML.length > originalHTML.length * 2) {
                        // Something went wrong, processed HTML is too large
                        element.setAttribute("sg-flag", "true");
                        continue;
                    }
                    
                    element.innerHTML = processedHTML;
                }
            } catch (e) {
                // Skip problematic elements
            }
            
            element.setAttribute("sg-flag", "true");
            processed++;
            
            // Break if we've been processing too long
            if (Date.now() - startTime > 50) break;
        }
        
        // Continue processing if there are more elements
        if (currentIndex < elementsToProcess.length) {
            setTimeout(processBatch, processingTimeout);
        } else {
            // Done processing, add event listeners
            addEventListenersToLinks();
            setupSimpleMutationObserver();
        }
    }
    
    // Simplified event listener setup
    var addEventListenersToLinks = function() {
        var allScriptureLinks = document.getElementsByClassName("sg_autolink");
        for (var i = 0; i < allScriptureLinks.length; i++) {
            if (!allScriptureLinks[i].hasAttribute('data-sg-listener')) {
                allScriptureLinks[i].addEventListener('click', function(e) {
                    e.preventDefault();
                    window.sgshow(this);
                    return false;
                });
                allScriptureLinks[i].setAttribute('data-sg-listener', 'true');
            }
        }
    };
    
    // Much simpler mutation observer
    function setupSimpleMutationObserver() {
        var mutationTimeout;
        
        var observer = new MutationObserver(function(mutations) {
            var hasNewContent = false;
            
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    for (var j = 0; j < mutation.addedNodes.length; j++) {
                        var node = mutation.addedNodes[j];
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            // Check if this looks like comment content
                            if (node.textContent && node.textContent.length > 20) {
                                hasNewContent = true;
                                break;
                            }
                        }
                    }
                    if (hasNewContent) break;
                }
            }
            
            if (hasNewContent) {
                clearTimeout(mutationTimeout);
                mutationTimeout = setTimeout(function() {
                    processNewContent();
                }, 200);
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // Function to process newly loaded content
    function processNewContent() {
        var newElements = document.querySelectorAll('p, div, span, li, td, blockquote, cite, h1, h2, h3, h4, h5, h6');
        var elementsToProcess = [];
        
        for (var i = 0; i < newElements.length; i++) {
            var el = newElements[i];
            if (!el.getAttribute("sg-flag") && el.textContent && el.textContent.length > 10) {
                // Skip if already contains scripture links
                if (!el.querySelector('.sg_autolink')) {
                    elementsToProcess.push(el);
                }
            }
        }
        
        if (elementsToProcess.length > 0) {
            processElementsBatch(elementsToProcess, 0);
        }
        
        // Always check for new links to add event listeners
        addEventListenersToLinks();
    }
    
    // Helper function to process a batch of elements
    function processElementsBatch(elements, startIndex) {
        var processed = 0;
        var maxBatch = 5; // Smaller batches for new content
        var startTime = Date.now();
        
        for (var i = startIndex; i < elements.length && processed < maxBatch; i++) {
            var element = elements[i];
            
            if (!document.contains(element) || element.getAttribute("sg-flag")) {
                continue;
            }
            
            var originalHTML = element.innerHTML;
            
            if (originalHTML.length > 3000) {
                element.setAttribute("sg-flag", "true");
                continue;
            }
            
            // Skip elements with complex CSS classes that might cause corruption
            if (originalHTML.indexOf('class="text-') > -1 || 
                originalHTML.indexOf('hover:') > -1 ||
                originalHTML.indexOf('focus-visible') > -1) {
                element.setAttribute("sg-flag", "true");
                continue;
            }
            
            try {
                var processedHTML = detectReferences(originalHTML, function(reference) {
                    var link = reference.trim().toLowerCase().replace(/[\s:]+/g, '.').replace(/\.+/g, '.').replace(/;\./g, ';').replace(/,\./g, ',');
                    return '<a class="sg_autolink" sg-flag="true" href="https://scripture.guide/' + link + '" target="_blank">' + reference + '</a>';
                });

                if (processedHTML !== originalHTML) {
                    // Safety check for corruption
                    if (processedHTML.length > originalHTML.length * 2) {
                        element.setAttribute("sg-flag", "true");
                        continue;
                    }
                    
                    element.innerHTML = processedHTML;
                }
            } catch (e) {
                // Skip problematic elements
            }
            
            element.setAttribute("sg-flag", "true");
            processed++;
            
            // Break if processing too long
            if (Date.now() - startTime > 30) break;
        }
        
        // Continue with remaining elements
        var nextIndex = startIndex + processed;
        if (nextIndex < elements.length) {
            setTimeout(function() {
                processElementsBatch(elements, nextIndex);
            }, 50);
        } else {
            // Done processing new content
            addEventListenersToLinks();
        }
    }
    
    // Start processing with delay
    if (elementsToProcess.length > 0) {
        setTimeout(processBatch, 500); // Give page time to load
    } else {
        addEventListenersToLinks();
    }
}
