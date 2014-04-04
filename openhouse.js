// ==UserScript==
// @name           Craigslist Open House Finder
// @namespace      daniel.pino
// @include        http://*.craigslist.org/apa*
// @version 1.0
// ==/UserScript==

var index = 0;
function processLink(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      a.id = index;

        if ((details.responseText.toLowerCase().indexOf("san luis obispo") !== -1 || details.responseText.toLowerCase().indexOf("slo") !== -1) && details.responseText.toLowerCase().indexOf("open house") !== -1) {
            check = '<span style="background:lightgreen;color:green;margin-left:8px;padding:2px 5px 2px 5px;border-radius:16px;" id="mycheckmark">✓</span>';
            openHouse = '<span id="myX" style="background: lightgreen;color: green;margin-left: 8px;padding: 2px 5px 2px 5px;border-radius:32px;">Open House</span>'
            $("#"+a.id).append(openHouse);
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
