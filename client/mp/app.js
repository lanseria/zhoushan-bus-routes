const now = new Date();
const hour = now.getHours();
let helloWords = '';
let isDark = true;
if (hour < 6) { helloWords = '凌晨好！' }
else if (hour < 9) { helloWords = '早上好！'; isDark = false }
else if (hour < 12) { helloWords = '上午好！'; isDark = false }
else if (hour < 14) { helloWords = '中午好！'; isDark = false }
else if (hour < 17) { helloWords = '下午好！'; isDark = false }
else if (hour < 19) { helloWords = '傍晚好！' }
else if (hour < 22) { helloWords = '晚上好！' }
else { helloWords = '夜里好！' } 
App({
  config: {
    host: 'sp.limonplayer.cn',
    theme: isDark ? 'dark' : 'light',
    helloWords
  },
  initWatch(_page) {
    if (!_page) {
      console.error('未检测到Page对象,请将当前page传入该函数');
      return false;
    }
    if (!_page.watch) {//判断是否有需要监听的字段
      console.error('未检测到Page.watch字段(如果不需要监听，请移除initWatch的调用片段)');
      return false;
    }
    let _dataKey = Object.keys(_page.data);
    Object.keys(_page.watch).map((_key) => {//遍历需要监听的字段
      _page.data['__' + _key] = _page.data[_key];//存储监听的数据
      if (_dataKey.includes(_key)) {//如果该字段存在于Page.data中，说明合法
        Object.defineProperties(_page.data, {
          [_key]: {//被监听的字段
            enumerable: true,
            configurable: true,
            set: function (value) {
              let oldVal = this['__' + _key];
              if (value !== oldVal) {//如果新设置的值与原值不等，则触发监听函数
                setTimeout(function () {//为了同步,否则如果回调函数中有获取该字段值数据时将不同步,获取到的是旧值
                  _page.watch[_key].call(_page, oldVal, value);//设置监听函数的上下文对象为当前的Page对象并执行
                }.bind(this), 0)
              }
              this['__' + _key] = value;
            },
            get: function () {
              return this['__' + _key]
            }
          }
        })
      } else {
        console.error('监听的属性[' + _key + ']在Page.data中未找到，请检查~')
      }
    })
  }
})