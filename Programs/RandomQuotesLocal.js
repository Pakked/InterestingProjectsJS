const express = require("express");
const app = express();
const quotes = [
  "Life is 10% what happens to you and 90% how you react to it.",
  "The greatest glory in living lies not in never falling, but in rising every time we fall.",
  "The only way to do great work is to love what you do.",
  "If you want to live a happy life, tie it to a goal, not to people or things."
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

app.get("/randomquote", (req, res) => {
    res.send(getRandomQuote());
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

// Visit http://localhost:3000/randomquote To See Quotes - Pakked :)