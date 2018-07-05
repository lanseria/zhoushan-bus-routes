const got = require('got');
const config = require('./config');

const { gotHostPrefix } = config;

exports.getFromServer = async function (interface, query) {
  const url = gotHostPrefix + interface;
  const response = await got.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      'X-Requested-With': 'XMLHttpRequest'
    },
    query: query
  })
  console.log(response.body);
  return response.body;
}
