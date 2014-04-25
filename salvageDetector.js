// ==UserScript==
// @name           Craigslist Salvage Detector
// @namespace      daniel.pino
// @description    Shows ad preview on link mouseover
// @include        http://*.craigslist.org/ct*
// @include        http://*.craigslist.org/search/ct*
// @version 1.0
// ==/UserScript==

var index = 0;
function processLink(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      	a.id = index;
		var html = details.responseText.toLowerCase();
        
        if (html.indexOf("salvage") !== -1 || html.indexOf("slvg") !== -1 || html.indexOf("svg") != -1 || html.indexOf("parts only") != -1 || html.indexOf(" lease") !== -1 || html.indexOf("rebuilt") != -1) {
            check = '<span style="background:lightgreen;color:green;margin-left:8px;padding:2px 5px 2px 5px;border-radius:16px;" id="mycheckmark">✓</span>';
            salvage = '<span id="myX" style="background: pink;color: red;margin-left: 8px;padding: 2px 5px 2px 5px;border-radius:32px;">Salvage</span>'
            $("#"+a.id).append(salvage);            
            //$("#"+a.id).parent().remove();

        }
        else if (html.indexOf(" lease") !== -1) {
            lease = '<span id="myX" style="background: pink;color: red;margin-left: 8px;padding: 2px 5px 2px 5px;border-radius:32px;">Lease</span>'
            $("#"+a.id).append(lease);            
        }
        //&#x0024;1 -> $1
        //&#x0024 - unicode symbol for dollar sign followed by semicolon and the dollar amount
        else if (html.indexOf("&#x0024;1 ") !== -1 || html.indexOf("&#x0024;2 ") !== -1 || html.indexOf("&#x0024;3 ") !== -1 ||
                 html.indexOf("&#x0024;4 ") !== -1 || html.indexOf("&#x0024;5 ") !== -1) {
            clickbait = '<span id="myX" style="background: pink;color: red;margin-left: 8px;padding: 2px 5px 2px 5px;border-radius:32px;">Click Bait</span>'
            $("#"+a.id).append(clickbait);       
        }
            
      	index++;
    }
  };
}


// find all the links to listings and fetch their content
function loadListings() {
  links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    link = links[i];
    if (link.href && link.href.match(/.*craigslist.*\/\d+\.html$/)) {
      GM_xmlhttpRequest({
        method:"GET",
            url: link.href,
            headers:{
              "User-Agent": navigator.userAgent,
            },
            onload: processLink(link)
        });
    }
  }
}

loadListings();
