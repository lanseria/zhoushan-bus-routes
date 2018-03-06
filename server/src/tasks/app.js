import axios from 'axios';
import * as _ from 'lodash';
import cheerio from 'cheerio';
import config from './config';
import { readLineRoutesFile, writeLineRoutesFile, readStations, writeStations } from './json'

const url = `${config.http}://${config.ip}:${config.port}/${config.inferface}/`;

const globalParam = {
  searchNumber: {
    term: 56
  },
  lineName: {
    lineName: '56路'
  }
}
async function getLineRoute (param) {
  const res = await axios.get(`${url}searchLine/getAutoCompleteLine.action`, {
    params: param
  })
  const nowHaveLineRoutes = res.data;
  let lineRoutesData = readLineRoutesFile();
  const allLineRoutes = lineRoutesData.allLineRoutes;
  const LineRoutes = _.uniq(_.concat(nowHaveLineRoutes, allLineRoutes));
  lineRoutesData.allLineRoutes = LineRoutes;
  const result = await writeLineRoutesFile(lineRoutesData);
  return result;
}

async function getStateByLineRouteNumber (param) {
  const res = await axios.get(`${url}initLinePage.action`, {
    params: param
  })
  const $ = cheerio.load(res.data);
  const jquery = '.info_box .info_2 .info_2a a'
  const updown = [$(`#line-0>${jquery}`), $(`#line-1>${jquery}`)];
  const StateName = {up: [], down: []};
  updown[0].map((index, m) => {
    StateName.up.push(m.children[0].data);
  })
  updown[1].map((index, m) => {
    StateName.down.push(m.children[0].data);
  })
  return StateName;
}

// getLineRoute(globalparam)
export async function getAllLineRoutes () {
  const template1To100 = [...Array(100).keys()];
  for (const term of template1To100) {
    const { searchNumber } = globalParam;
    searchNumber.term = term;
    const res = await getLineRoute(searchNumber);
    if (res) {
      console.log(`写入成功通过关键字 ${term}`);
    } else {
      console.log('写入失败');
    }
  }
}
// getStateByLineRouteNumber(globalParam.lineName);
export async function getAllStateByLRN () {
  let lineRoutesData = readLineRoutesFile();
  const allLineRoutes = lineRoutesData.allLineRoutes;
  for (const lineName of allLineRoutes) {
    globalParam.lineName.lineName = lineName;
    const StateName = await getStateByLineRouteNumber(globalParam.lineName);
    const nowObj = await readStations();
    const writeStation = {};
    writeStation[lineName] = StateName;
    const writeObj = { ...nowObj, ...writeStation };
    const res = await writeStations(writeObj)
    if (res) {
      console.log(`写入成功 line ${lineName}`);
    } else {
      console.log('写入失败');
    }
  }
}
