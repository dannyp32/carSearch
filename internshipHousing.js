// ==UserScript==
// @name           Craigslist Internship Housing Finder
// @namespace      daniel.pino
// @include        http://seattle.craigslist.org/search/est/apa*
// @include        http://seattle.craigslist.org/search/est/roo*
// @include        http://seattle.craigslist.org/search/est/sub*

// @version 1.0
// ==/UserScript==

var index = 0;
var found = 0;
function processLink(_a) {
  var a = _a;
    
  return function(details) {
    if (details.responseText) {
      a.id = index;

      if (details.responseText.toLowerCase().indexOf("june") !== -1 && details.responseText.toLowerCase().indexOf("through june") === -1) {
        found++;
        $("#homes-found").append('<div><a href="' + a.href + '">' + a.href + '</a></div>');
      }
      
      $("#script-counter").html('COUNT: ' + index + '\nFOUND: ' + found); 
      index++;
    }
  };
}


// find all the links to listings and fetch their content
function loadListings() {
  links = $('.hdrlnk');
  
  $("html").append('<div id="script-counter" style="background-color:#f73d3d;font-size:64;padding:40px;color:white;position:absolute;top:50px;right:20px;z-index:1000;border-radius:4px;font-family:sans-serif;font-weight:bold;">COUNT: ' + index + '   FOUND: ' + found + '</div>'); 
  $("html").append('<div id="homes-found" style="background-color:#efefef;font-size:64;padding:40px;color:#555;position:absolute;top:150px;right:20px;z-index:1000;border-radius:4px;font-family:sans-serif;font-weight:bold;">HOMES FOUND</div>'); 

  for (var i = 0; i < links.length; i++) {
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
