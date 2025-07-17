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
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if(document.getElementById("root")===undefined) element.normalize();
        
        // Skip if element already has our flag
        if (element.getAttribute("sg-flag") != null) continue;

        var originalHTML = element.innerHTML;
        
        // Use scripture-guide detectReferences to find and replace scripture references
        var processedHTML = detectReferences(originalHTML, function(reference) {
            // Convert reference to URL format
            var link = reference.trim().toLowerCase().replace(/[\s:]+/g, '.').replace(/\.+/g, '.').replace(/;\./g, ';').replace(/,\./g, ',');

            return ' <a class="sg_autolink" sg-flag="true" href="https://scripture.guide/' + link + '" target="_blank">' + reference + '</a> ';
        });

        // Only update if changes were made
        if (processedHTML !== originalHTML) {
            // Clean up spacing around links
            processedHTML = processedHTML.replace(/([;, ]+(?:and)*)\s*<\/a>/gi, "</a>$1 ");
            processedHTML = processedHTML.replace(/[;, ]+(?:and)*\s*\"/gi, "\"");
            
            element.innerHTML = processedHTML;
            element.setAttribute("sg-flag", "true");
        }
    }

    // Handle nested links (when our links are inside existing links)
    var newLinks = document.getElementsByClassName("sg_autolink");
    for (var i = 0; i < newLinks.length; i++) {
        if (newLinks[i].parentElement.tagName == "A") {
            if (newLinks[i].parentElement.children.length > 1) continue;

            var child = newLinks[i];
            var parent = newLinks[i].parentElement;
            var link = child.href;

            child.outerHTML = child.innerText;
            parent.outerHTML = ' <a class="sg_autolink" sg-flag="true" href="' + link + '" target="_blank">&#128279;</a> ' + parent.outerHTML;
        }
    }

    // Add event listeners to all scripture links (CSP compliant)
    var addEventListenersToLinks = function() {
        var allScriptureLinks = document.getElementsByClassName("sg_autolink");
        for (var i = 0; i < allScriptureLinks.length; i++) {
            // Check if event listener already added
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
    
    // Add event listeners to existing links
    addEventListenersToLinks();
    
    // Set up mutation observer to handle dynamically added content
    var observer = new MutationObserver(function(mutations) {
        var shouldAddListeners = false;
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldAddListeners = true;
            }
        });
        
        if (shouldAddListeners) {
            setTimeout(addEventListenersToLinks, 50);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}
