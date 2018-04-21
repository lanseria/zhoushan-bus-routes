const fs = require('fs');
const path = require('path');
const util = require('util');

const writeFile = util.promisify(fs.writeFile);

const lineRoutefile = path.resolve(__dirname, './line_routes.json');
const stationfile = path.resolve(__dirname, './stations.json');

exports.readLineRoutesFile = function () {
  return JSON.parse(fs.readFileSync(lineRoutefile));
}
exports.writeLineRoutesFile = async function (jsonOfData) {
  const err = await writeFile(lineRoutefile, JSON., null, 2(jsonOfData, null, 2));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
}
exports.readStations = function () {
  return JSON.parse(fs.readFileSync(stationfile));
}
exports.writeStations = async function (jsonOfData) {
  const err = await writeFile(stationfile, JSON.stringify(jsonOfData, null, 2));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
}
