const fetch = require('node-fetch');

const API = 'https://api.quotable.io/random';

async function fetchAndParse(apiURl) {
  const response = await fetch(apiURl);
  return response.json();
}

function init() {
  fetchAndParse(API).then((json) => console.log(json.content));
}

module.exports = { init };
