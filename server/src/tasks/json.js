import fs from 'fs';
import path from 'path';
import util from 'util';

const writeFile = util.promisify(fs.writeFile);

const lineRoutefile = path.resolve(__dirname, './line_routes.json');
const stationfile = path.resolve(__dirname, './stations.json');

export function readLineRoutesFile () {
  return JSON.parse(fs.readFileSync(lineRoutefile));
}
export async function writeLineRoutesFile (jsonOfData) {
  const err = await writeFile(lineRoutefile, JSON.stringify(jsonOfData));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
}
export function readStations () {
  return JSON.parse(fs.readFileSync(stationfile));
}
export async function writeStations (jsonOfData) {
  const err = await writeFile(stationfile, JSON.stringify(jsonOfData));
  if (err) {
    return new Error('写文件失败');
  } else {
    return true;
  }
}
