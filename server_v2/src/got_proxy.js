const got = require('got');
const config = require('./config');

const { gotHostPrefix } = config;

exports.getFromServer = async function (interface, query) {
  const url = gotHostPrefix + interface;
  got.get(url, )
}
