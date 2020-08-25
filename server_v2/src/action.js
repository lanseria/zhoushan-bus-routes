// const {
//   AllLine
// } = require('./mongoose')

// exports.getAllLineToRead = async function () {
//   const allLine = await AllLine.findOne({
//     areaId: 316000
//   }, null, {
//     sort: {
//       _id: -1
//     }
//   })
//   if (!allLine) {
//     return false
//   }
//   return allLine.content
// }

exports.getAllLineToWrite = async function (query, getFromServer) {
  const content = await getFromServer("/line!getAllLines.action", query);
  // const contentParse = JSON.parse(content);
  // const contentLength = contentParse.length;
  await AllLine.create({
    content,
    areaId: 316000,
  });
  console.log(`bus lines have been insert!`);
  return content;
};
