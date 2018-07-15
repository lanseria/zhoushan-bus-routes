const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const {
  getFromServer,
  postFromServer
} = require('./got_proxy');
const {
  getAllLineToRead,
  getAllLineToWrite
} = require('./action');

const {
  DataProcess,
  DataProcessByDB
} = require('./data_process');

exports.getAllLine = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    query
  } = request;
  // const content = await getAllLineToRead();
  // const body = await DataProcessByDB(content, query, getAllLineToWrite, getFromServer);
  const response = await getFromServer('/line!getAllLines.action', query);
  ctx.body = DataProcess(response.body, 'OK - getAllLine');
}

exports.getHotKey = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    query
  } = request;
  let {
    hotRoutes
  } = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../hot_routes.json')));
  hotRoutes = _(hotRoutes).sortBy(['count']).reverse().map('name').slice(0, 10).value();
  ctx.body = DataProcess(hotRoutes, 'OK - getHotKey');
}

exports.getLine = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    querystring
  } = request;
  const response = await postFromServer('/line!getLine.action', querystring);
  ctx.body = DataProcess(response.body, 'OK - getLine');
}

exports.getBusWaiting = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    querystring
  } = request;
  const response = await postFromServer('/bus!getBusWaiting.action', querystring);
  ctx.body = DataProcess(response.body, 'OK - getBusWaiting');
}