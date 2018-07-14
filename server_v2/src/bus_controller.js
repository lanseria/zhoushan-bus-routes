// const _ = require('lodash');
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
  const content = await getAllLineToRead();
  const body = await DataProcessByDB(content, getAllLineToWrite, query);
  ctx.body = body;
}

exports.getHotKey = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    query
  } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}

exports.getLine = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    querystring
  } = request;
  ctx.body = await postFromServer('/line!getLine.action', querystring);
}

exports.getBusWaiting = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    query
  } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}