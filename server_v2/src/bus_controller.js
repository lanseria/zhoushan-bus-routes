// const _ = require('lodash');
const {
  getFromServer
} = require('./got_proxy');
const {
  AllLine
} = require('./mongoose')

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

async function getAllLineToRead() {
  const allLine = await AllLine.findOne({
    areaId: 316000
  }, null, {
    sort: {
      _id: -1
    }
  })
  if (!allLine) {
    return false
  }
  return allLine.content
}

async function getAllLineToWrite(query) {
  const content = await getFromServer('/line!getAllLines.action', query);
  // const contentParse = JSON.parse(content);
  // const contentLength = contentParse.length;
  await AllLine.create({
    content,
    areaId: 316000
  })
  console.log(`bus lines have been insert!`)
  return content;
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