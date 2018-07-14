const got = require('got');
const tunnel = require('tunnel');
const config = require('./config');
const {
  gotHostPrefix
} = config;
const isDevelopmentProxy = process.env.NODE_ENV === 'development-proxy';
console.log(isDevelopmentProxy);

const gotConfig = {
  agent: isDevelopmentProxy ? tunnel.httpOverHttp({
    proxy: {
      host: 'localhost',
      port: 8888
    }
  }) : false,
  headers: {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
    'X-Requested-With': 'XMLHttpRequest'
  }
}

exports.getFromServer = async function (apiUrl, query) {
  const url = gotHostPrefix + apiUrl;
  const response = await got.get(url, {
    ...gotConfig,
    query: query
  })
  return response;
}

exports.postFromServer = async function (apiUrl, querystring) {
  const url = gotHostPrefix + apiUrl;
  const response = await got.post(url, {
    ...gotConfig,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: querystring,
  })
  return response;
}
