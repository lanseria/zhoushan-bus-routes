// const _ = require('lodash');
const {
  getFromServer
} = require('./got_proxy');
const {
  getAllLineToRead,
  getAllLineToWrite
} = require('./action');

exports.getAllLine = async function (ctx) {
  const {
    request
  } = ctx;
  const {
    query
  } = request;
  let content = await getAllLineToRead();
  // console.log(content);
  if (!content) {
    content = await getAllLineToWrite(query);
    console.log('from web');
  } else {
    console.log('from local');
  }
  ctx.body = content;
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
    query
  } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
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