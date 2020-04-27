const app = require("../src/got_proxy");
const fs = require("fs");
(async () => {
  let data = await app.getNewsFromServer(
    "noticeList.jsp" + "?2592E0AAEB474835982C10E0B651475F"
  );
  console.log(data.body);
  fs.writeFileSync(`${__dirname}/list.html`, data.body);
  data = await app.getNewsFromServer(
    "notice.jsp" + "?2592E0AAEB474835982C10E0B651475F"
  );
  console.log(data.body);
  fs.writeFileSync(
    `${__dirname}/8a8aa1e445b086df0145b087d62a0003.html`,
    data.body
  );
})();
