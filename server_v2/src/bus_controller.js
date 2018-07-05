// const _ = require('lodash');
const { getFromServer } = require('./got_proxy');

exports.getAllLine = async function (ctx) {
  const { request } = ctx;
  const { query } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}

exports.getHotKey = async function (ctx) {
  const { request } = ctx;
  const { query } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}

exports.getLine = async function (ctx) {
  const { request } = ctx;
  const { query } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}

exports.getBusWaiting = async function (ctx) {
  const { request } = ctx;
  const { query } = request;
  ctx.body = await getFromServer('/line!getAllLines.action', query);
}
