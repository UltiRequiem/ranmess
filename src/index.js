const fetch = require('node-fetch')

const API = 'https://api.quotable.io/random'

/**
 * @param {string} apiURl An URL to feth
 * @returns {Promise<object>} A json
 */
async function fetchAndParse(apiURl) {
  const response = await fetch(apiURl)
  return response.json()
}

/** Run all */
function init() {
  fetchAndParse(API)
    .then((json) => console.log(` ${json.content} \n  - ${json.author}`))
    .catch(() => console.log("Probably you don't have internet."))
}

module.exports = { init }
