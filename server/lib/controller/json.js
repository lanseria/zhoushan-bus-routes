const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);
const hotRoutes = path.resolve(__dirname, './hot_routes.json');
const ipRecord = path.resolve(__dirname, './ip_record.json');

exports.readIpRecordFile = function () {
  return JSON.parse(fs.readFileSync(ipRecord));
};

exports.writeIpRecordFile = async function (jsonOfData) {
  const err = await writeFile(ipRecord, JSON.stringify(jsonOfData));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
};

exports.readHotRoutesFile = function () {
  return JSON.parse(fs.readFileSync(hotRoutes));
};

exports.writeHotRoutesFile = async function (jsonOfData) {
  const err = await writeFile(hotRoutes, JSON.stringify(jsonOfData));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
};