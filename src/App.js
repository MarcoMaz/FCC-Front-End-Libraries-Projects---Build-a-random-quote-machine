import React, { useState, useEffect} from 'react';
import './App.scss';

const BASE_URL = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function RandomQuote(){
  const [ tweet, setTweet ] = useState({
    author: '',
    quote: '',
    twitter: ''
  })
  
  const fetchQuote = () => {
    fetch(BASE_URL)
    .then( res => res.json())
    .then( parsedJSON => {
      let results = parsedJSON.quotes[Math.floor(Math.random() * parsedJSON.quotes.length)]
      setTweet({
        author: results.author,
        quote: results.quote,
        twitter: 'http://twitter.com/intent/tweet?hashtags=quotes&text='
      })
    })
  }
  
  useEffect(() => { fetchQuote() }, [])
  
  const { quote, author, twitter } = tweet
  const tweetThis = twitter + '"' + quote + '" ' + author
  
  return(
    <div id='quote-box'>
      <h1>Random Quote Machine</h1>
      <p id="text">{ quote }</p>
      <div id="author">{ author }</div>
      <div id="buttons">
        <button
          class="btn-info" 
          id="new-quote"
          onClick={fetchQuote}>New entry</button>
        <button class="btn-default">
          <a 
            id="tweet-quote" 
            href={ tweetThis }>
            Tweet this!
          </a>
        </button>
      </div>
    </div>
    )
}

export default RandomQuote;