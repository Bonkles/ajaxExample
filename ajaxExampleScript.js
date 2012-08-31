google.load("feeds", "1");


//This is a simple function straight from the google API documentation, explaining how to 
//display some simple feed elements. 

//Not good enough! Let's jQuerify this in the next function. 
function fetchSomeNews(newsRssURL) {

    //Load the feed specififed in the URL. 
    var feed = new google.feeds.Feed(newsRssURL);
    feed.load(function (result) {
        if (!result.error) {
            var container = document.getElementById("feed");
            for (var i = 0; i < result.feed.entries.length; i++) {
                var entry = result.feed.entries[i];
                var div = document.createElement("div");
                div.appendChild(document.createTextNode(entry.title));
                container.appendChild(div);
            }
        }
    });
}

//Now we're talkin. 
function fetchSomeNewsWithJQuery(newsRssURL) 
{
    var feed = new google.feeds.Feed(newsRssURL);
    feed.load(function (result) {
        if (!result.error) {
            //First, we should remove any existing news items that we already displayed. 
            $('.news-item').remove(); 
            //For each feed entry, write the news item to the 'news' div. 
            $.each(result.feed.entries, writeNewsItem);
        }
    }); //End feed.load()
}//end fetchSomeNewsWithJQuery


function writeNewsItem(index, newsItem) {
                $('<div/>', {html: newsItem.title}).appendTo('#news').addClass('news-item');            
}
