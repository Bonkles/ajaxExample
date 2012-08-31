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

//Now we're talkin. A Jquery-enabled version of the above function, that does a little something
//extra. 
//
//Parameter 'newsRssURL': the RSS feed URL. 
function fetchSomeNewsWithJQuery(newsRssURL) 
{
    //use the google feeds API to obtain the RSS URL's contents.
    var feed = new google.feeds.Feed(newsRssURL);
    feed.load(function (result) {
        //If we loaded the feed successfully, then display the feed elements!
        if (!result.error) {
            //First, we should remove any existing news items that we already displayed
            //Otherwise, we'll keep appending stuff to the list with each click. 
            $('.news-item').remove();
            $('.sports-item').remove();
            //For each feed entry, write the news item to the 'news' div. 
            $.each(result.feed.entries, writeNewsItem);
        }
    }); //End feed.load()
}//end fetchSomeNewsWithJQuery

//Each news item has the following attributes: 
//
//link:             a string with the URL to the full story. 
//publishedDate:    a string consisting of the published Date. 
//title:            the title of the story. 
//contentSnippet:   a string with a brief snippet of the story's content. 
//content:          a string containing the entirety of the story's contents. 
//author:           a string containing the story's author. 
//categories:       a list of strings containing possible category names. 
function writeNewsItem(index, newsItem) {
               var titleWithLink = '<a href="javascript:void(0);" onclick="openPopUp(\'' + newsItem.link + '\')">' + newsItem.title + '</a>';
               var divElement =  $('<div/>', {html: titleWithLink}).appendTo('#news').addClass('news-item');
               divElement.append($('<div/>', {html: newsItem.contentSnippet}).addClass('snippet-text'));
}


//This function opens a pop-up at the specified link. 
function openPopUp(link) {
    popUpWindow = window.open(link, 'News Item', 'height=1024,width=768,scrollbars=yes');
    if (window.focus) { popUpWindow.focus() }
    return false;
}