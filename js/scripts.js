document.getElementById('trigger').addEventListener('click', getQuote);

function getQuote(e){
  e.preventDefault();

  const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
  const xhr = new XMLHttpRequest();

  xhr.open('GET', quoteUrl + ((/\?/).test(this) ? "&" : "?") + (new Date()).getTime(), true);
  xhr.onload = function(){
    if(this.status == 200){
      let quote = JSON.parse(this.responseText);
      let output = `<h2 class="quote"> ${quote[0].content} </h2>
                    <h3 class="author"> ${quote[0].title} </h3>`
      document.getElementById('box').innerHTML = output;

      createTweet();
    }
  }
  xhr.onerror = function(){
    console.log('Request Error...');
  }
  xhr.send();
}

function createTweet(){

  let tweetLink = "https://twitter.com/intent/tweet?text=";
  let author = document.getElementsByClassName('author')[0].innerText;
  let quote = document.getElementsByClassName('quote')[0].children[0].innerText;

  if (!author.length) {
    author = "Unknown author";
  }

  const tweetText = `Quote of the day - ${quote} | Author: ${author}`;

  if (tweetText > 240) {
    getQuote();
  }
  let tweet = tweetLink + encodeURIComponent(tweetText);
  document.querySelector('.tweet').setAttribute('href', tweet);
}
