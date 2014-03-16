$(document).ready(function(){
   // Binding an listener to the submit event on the form:
   $('#submit').click(function(e){

      // If a previous submit is in progress:
      if($('#submit').hasClass('active')) {
         alert("Calm down bro!");
         return false;
      }
      
      alert("you clicked it bro!");

      // so that we don't click a ton of times
      $('#submit').addClass('active');
      
      searchQuery = $('#search').val();
      //console.log(searchQuery.split(' ').join("%20"));
      console.log(searchQuery.toString());
      console.log(searchQuery);
      yearMin = "2010";
      yearMax = "2014";
      priceMax = "13000";
      priceMin = "0";
      rssurl = "http://losangeles.craigslist.org/search/cta/lgb?autoMaxYear=2014&autoMinYear=2010&catAbb=cta&maxAsk=13000&minAsk=100&query=focus&s=0&format=rss";
      //rssurl = "http://losangeles.craigslist.org/search/cta/lgb?autoMinYear=" + yearMin + "&catAbb=cta&maxAsk=" + priceMax + "&query=" + searchQuery + "&s=0&format=rss";
      altRss = "http://losangeles.craigslist.org/search/cta/lgb?zoomToPosting=&catAbb=cta&query=ford&minAsk=100&maxAsk=13000&autoMinYear=2010&autoMaxYear=2014&autoMakeModel=&excats=";
      $.get(altRss, function(data) {
         console.log(data);
         console.log(data.toString());

          var $xml = $(data);
          $xml.find("item").each(function() {
              var $this = $(this),
                  item = {
                      title: $this.find("title").text(),
                      link: $this.find("link").text(),
                      description: $this.find("description").text(),
                  }
              //Do something with item here...
               console.log(item);
               console.log(json.stringify(item));
          });
      });

      $('#submit').removeClass('active');
   });
   
//   $(window).resize();
});

