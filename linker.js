var startTime = new Date().getTime();

var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet')
link.setAttribute('type', 'text/css')
link.setAttribute('href', 'https://fonts.googleapis.com/css?family=Kreon')
document.getElementsByTagName('head')[0].appendChild(link)


//Add Styles
var style = document.createElement('style')
style.innerHTML = "a.sg_autolink:link{ \
	color:black!important; \
	font-family: 'Kreon'; \
	text-decoration:none!important; \
    border-radius:4px; \
	border:1px dotted #552B1B; \
	padding: 0 .5em 0 .5em; \
	background-color:#f2e5d9; }";
style.innerHTML += "a.sg_autolink:hover{ \
	text-decoration:none!important;  \
	border-bottom:1px solid #552B1B; \
    color:#552B1B!important; \
	background-color:#f2e5d9;  }";
style.innerHTML += "a.sg_autolink:visited{  \
	color:black!important; }";
document.getElementsByTagName('head')[0].appendChild(style)


//Add Popup Function 
var script = document.createElement('script')
script.innerHTML = 'function sgshow(el) {   \
PopupCenter(el.href, "Scripture Guide", 1000, 750);\
}\
function PopupCenter(e, n, t, i) {\
    var o = void 0 != window.screenLeft ? window.screenLeft : screen.left,        \
        d = void 0 != window.screenTop ? window.screenTop : screen.top,        \
        c = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,        \
        w = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,        \
        r = c / 2 - t / 2 + o,        \
        h = w / 2 - i / 2 + d,        \
        s = window.open(e, n, "scrollbars=yes, width=" + t + ", height=" + i + ", top=" + h + ", left=" + r);\
    return window.focus && s.focus(), !1}';
document.getElementsByTagName('head')[0].appendChild(script)



var books = [];



//Old Testament
books.push("gen\\.*(?:esis)*");
books.push("exo*\\.*(?:dus)*");
books.push("levi*t*\\.*(?:icus)*");
books.push("num\\.*(?:bers)*");
books.push("deut\\.*(?:eronomy)*");
books.push("josh\\.*(?:ua)*");
books.push("judg\\.*(?:es)*");
books.push("rut*h*\\.*");
books.push("samu*\\.*(?:el)*");
books.push("ki*n*gs*\\.*");
books.push("chro*n*\\.*(?:icles)*");
books.push("ezr*\\.*(?:a)*");
books.push("neh\\.*(?:emiah)*");
books.push("esth*\\.*(?:er)*");
books.push("job");
books.push("ps\\.*(?:a)*\\.*(?:lm)*\\.*(?:s)*");
books.push("prov\\.*(?:erbs)*");
books.push("eccl*\\.*(?:esiastes)*");
books.push("song of solomon");
books.push("song of songs");
books.push("isa\\.*(?:iah)*");
books.push("jer\\.*(?:emiah)*");
books.push("lame*n*t*\\.*(?:ations)*");
books.push("eze*k*\\.*(?:iel)*");
books.push("dan\\.*(?:iel)*");
books.push("hos*\\.*(?:ea)*");
books.push("joel*\\.*");
books.push("amos*\\.*");
books.push("obad\\.*(?:iah)*");
books.push("jon\\.*(?:ah)*");
books.push("mic*\\.*(?:ah)*");
books.push("nah*\\.*(?:um)*");
books.push("hab*\\.*(?:akuk)*");
books.push("zeph*\\.*(?:aniah)*");
books.push("hag\\.*(?:gai)*");
books.push("zech*\\.*(?:ariah)*");
books.push("mal*\\.*(?:achi)*");


//New Testament
books.push("(?:mat*t*h*|mt)\\.*(?:ew)*");
books.push("mark");
books.push("luk*e*\\.*");
books.push("jo*h*n\\.*");
books.push("(?:the )*acts\\.*(?: of the apostles)*");
books.push("rom\\.*(?:ans)*");
books.push("cor\\.*(?:inthians )*");
books.push("gal*a*\\.*(?:tians)*");
books.push("ephe*\\.*(?:sians)*");
books.push("phili*p*\\.*(?:ippians)*");
books.push("colo*s*\\.*(?:sians)*");
books.push("thess*\\.*(?:alonians)*");
books.push("tim\\.*(?:othy)*");
books.push("titus");
books.push("philem*o*n*\\.*");
books.push("he\\.*(?:b)*\\.*(?:rews)*");
books.push("ja\\.*(?:me)*s");
books.push("pet*\\.*(?:er)*");
books.push("ju\\.*(?:d)*\\.*(?:e)*");
books.push("rev\\.*(?:elation)*");


//Book of Mormon
books.push("ne\\.*(?:phi)*");
books.push("jac\\.*(?:ob)*");
books.push("enos");
books.push("jar\\.*(?:om)*");
books.push("om\\.*(?:ni)*");
books.push("w(?:ords)*[ _-]*o[ _-f]*m(?:ormon)*");
books.push("mos\\.*(?:iah)*");
books.push("alma");
books.push("hela*\\.*(?:a*man)*");
books.push("eth\\.*(?:er)*");
books.push("morm\\.*(?:on)*");
books.push("moro\\.*(?:ni)*");


//D&C
books.push("d(?:octrine)*\\.* *(?:&amp;|&|and)* *c(?:ovenants)*(?:\\s*\\bSec(?:tion)*)*\\.*");


//Pearl of Great Price
books.push("Moses");
books.push("Abra*\\.*(?:ham)*");
books.push("Jos(?:eph)*\\.* Smith(?:[–—\\- ]History)*");
books.push("Jos(?:eph)*\\.* Smith(?:[–—\\- ]Matthew)*");
books.push("JS[—\\-]*\\s*[H]");
books.push("JS[—\\-]*\\s*[M]");
books.push("a(?:rticles)*[ _-]*o[ _-f]*f(?:aith)*");


//Other Mormon Scripture
//books.push("lect*(?:ures*)*(?: on faith)*\\.*");
//books.push("l[ _-]*o*[ _-n]*f");
//books.push("bo*c");
//books.push("(?:book of )*com(?:mandments)*");
//books.push("l *on* *f");
//books.push("lec\\.*(?:tures*)(?: on faith)");


//Strangite
books.push("(?:the )*(?:book of )*(?:the )*Law of the Lord");
//books.push("Law");


//MW&W
//books.push("tsp");
//books.push("the sealed portion");
//books.push("1\\s*(?:st)*\\s*v(?:ision)*");


//Islam
books.push("koran");
books.push("(?:al[ \\-––])*qur'*’*ani*c*(?:verses*)*");
//books.push("surah [a-z\\-–’']+(?: |:|–|\\-|v|vv|verses*)*");
//books.push("al[ \\-–][a-z\\-–’']+(?: |:|–|\\-|v|vv|verses*|ayab)*");


////////////////////////////////////////////////////////


//Combine Books
var books = "(?:" + books.join("|") + ")\\s*"; //   \\(*

//Books that have a digit before them
var numbooks = [];
numbooks.push("ne");
numbooks.push("sam");
numbooks.push("ki*n*gs");
numbooks.push("chr");
numbooks.push("cor");
numbooks.push("ti");
numbooks.push("thes");
numbooks.push("pet");
numbooks.push("jo*h*n");


//Meta data components
var jst = "(?:[, —\\-]*(?:Joseph Smith[']*s* Translation *o*f*|\\(Joseph Smith[']*s* Translation *o*f*\\)|jst|\\(jst\\))[, \\—\\-)]*)*";
var ordinals = "(?:[I1-4]*(?:3rd|1st|2n*d|4th|first|sec*o*n*d*\\.*|third|fourt*h*)* *\\b)*";
var booksof = "(?:\\s*books* of\\s*)*";
var prechapter = "(?:\\s|\\-|–|,)*";
var chapter = "(?:,*\\s*" + ordinals + "\\bcha*p*t*e*r*s*\\.*,*\\s*)";
var verse = "(?:,*\\s*" + ordinals + "\\bv*ve*r*s*e*s*\\.*,*\\s*)";
var versenums = "\\s*[0-9]+"; //[a-f]*
var joiners = "(?:[,;&\\/](?:\\s*and\\s*)*\\s*(?!$))*";
var bumper = "(?![^<>]*>)"; //prevents matching inside of quotes

//Punctuations, etc
var punct = [];
punct.push("\\s*[:\\-\\.–—]" + versenums); //[a-z]{0,1} //colons,dots and dashes
punct.push("\\s*(?:" + chapter + "|" + verse + ")" + versenums); //spelled out chapter and verse words
punct.push("\\s*(?:;|,|,* *and|&amp;|&| *to *)\\s*[1-9]\\d*(?!\\s*(" + numbooks.join("|") + "))"); //passage breakers (a new book may appear after)

//combine punctuation
var punct = "(?:[1-9]\\d*(?:" + punct.join("|") + ")*)";

//Full Regex
var match = bumper + "((?:(?:" + jst + "\\b" + ordinals + booksof + books + prechapter + chapter + "*" + punct + jst + ")" + joiners + ")+)";

var pattern = new RegExp(match, 'gi');



//Matching Patterns not to include (Blacklist/Override)

var blacklist = [];
blacklist.push("\\d{4,}");                          // 4 Digit references
blacklist.push("^Ch\\. \\d+");                      //Chapter with no book
blacklist.push("\\w\\w\\d\\d");                     //Words with numbers together KGURO43KEAJFK

//Oneoff Blacklist
blacklist.push("\\bro \\d+\\b");                //lowecase letters followed by numbers   
blacklist.push("\\bETH \\d+\.\\d+\\b");       
blacklist.push("\\b(BC|AD|BCE)[––—−]+\\d+\\b");                     //550 BC–330 BC
blacklist.push("\\b(AC3|PS2|PS3|PS4)\\b");                     //Common file extentions
blacklist.push("\\b(ps|PS)[1-9]\\b");                     //Common file extentions



var blacklist_pattern = new RegExp("(" + blacklist.join("|") + ")", 'g');


var a_elements = document.getElementsByTagName('a');

var elements = document.querySelectorAll('div,span,blockquote,p,li,td,a,strong,em,label,b,strong,i,dd,cite,h1,h2,h3,h4,h5,h6')
var runme = true;
/*
if (elements.length > 15000) {
	if (confirm("Scanning this page for scripture references may take a while.  Continue?")) {

	} else {
		runme = false;
	}
}
*/

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

//Override buil-in scripture links with SG links (instead of just adding a link icon)

for (var i = 0; i < a_elements.length; i++) {


    //Remove all Links
    if (a_elements[i].getAttribute("href") == null) continue;

    if (a_elements[i].getAttribute("href").match(excludes.join("|"))) {


        content = document.createTextNode(a_elements[i].textContent);

        //dont mess with links that dont have a number in them
        if (a_elements[i].getAttribute("href").match(/[0-9]/)==null) continue;
        if (content.textContent.match(/[0-9]/)==null) continue;

        //dont mess with links that dont have a ref in the contents (single numbers, etc.)
        //if (content.textContent.match(/^(chapter|section)*\s*[0-9:]+$/i)!=null) continue;


    	//console.log(a_elements[i].getAttribute("href"));
		//console.break();
        a_elements[i].parentNode.insertBefore(content, a_elements[i]);
        a_elements[i].parentNode.removeChild(a_elements[i]);
        i--;

    }
}
if (runme) {


    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if(document.getElementById("root")===undefined)  element.normalize();
        for (var j = 0; j < element.childNodes.length; j++) {
            var node = element.childNodes[j];

            if (node.nodeType === 3) {

                var text = node.nodeValue.replace(/(?:\r\n|\r|\n)/g, ' ').replace(/\s+/g, ' ') //remove line breaks

                //console.log(text);

                var matches = text.match(pattern);


                if (matches && element.getAttribute("sg-flag") == null) {

                    var content = element.innerHTML;
                    content = content.replace(/&nbsp;/g, " ");

                    //process blacklist

                    highlighted = content.replace(pattern, function(match, contents, offset, s) {

                        if(typeof contents == "undefined") return "";

                        contents = contents.trim();
                        var link = contents;
                        link = link.trim().toLowerCase();
                        link = link.split(/[\s:]+/).join('.');
                        link = link.split(/\.+/).join('.');
                        link = link.split(";.").join(';');
                        link = link.split(",.").join(',');

                        if (contents.match(blacklist_pattern))
                        {

                            try {
                               return contents.trim();
                            }
                            catch(err) {
                                return "";
                            }
                        }  


                        return ' <a class="sg_autolink" onclick="sgshow(this); return false;" sg-flag="true" href="http://scripture.guide/' + link + '" target="_blank">' + contents + '</a> ';
                    });




                    highlighted = highlighted.replace(/([;, ]+(?:and)*)\s*<\/a>/gi, "</a>$1 ");
                    highlighted = highlighted.replace(/[;, ]+(?:and)*\s*\"/gi, "\"");
                    element.innerHTML = highlighted;
                    j++;

                }
            }
        }
    }

    var newLinks = document.getElementsByClassName("sg_autolink");
    for (var i = 0; i < newLinks.length; i++) {

        if (newLinks[i].parentElement.tagName == "A") {
            if (newLinks[i].parentElement.children.length > 1) continue;

            var child = newLinks[i];
            var parent = newLinks[i].parentElement;

            var link = child.href;

            child.outerHTML = child.innerText;
            parent.outerHTML = ' <a class="sg_autolink" onclick="sgshow(this); return false;" sg-flag="true" href="' + link + '" target="_blank">&#128279;</a> ' + parent.outerHTML;




        }
    }


}