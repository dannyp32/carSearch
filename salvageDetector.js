// ==UserScript==
// @name           Craigslist Salvage Detector
// @namespace      daniel.pino
// @description    Shows ad preview on link mouseover
// @include        http://*.craigslist.*
// @version 1.0
// ==/UserScript==

/* Can be used with Greasemonkey on Firefox or Tampermonkey on Chrome */

var index = 0;
function processLink(_a) {
  var a = _a;
    console.log("a prints...");
    console.log(a);
  return function(details) {
    if (details.responseText) {
      a.id = index;

        if (details.responseText.toLowerCase().indexOf("salvage") !== -1) {
            check = '<span style="background:lightgreen;color:green;margin-left:8px;padding:2px 5px 2px 5px;border-radius:16px;" id="mycheckmark">✓</span>';
            salvageFlag = '<span id="myX" style="background: pink;color: red;margin-left: 8px;padding: 2px 5px 2px 5px;border-radius:32px;">Salvage</span>'
            console.log(check + "" + $("#" + a.id).html());
            $("#"+a.id).append(salvageFlag);
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
