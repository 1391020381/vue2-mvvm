var data = {name: 'kingdeng'}
observe(data)
data.name = 'dmq'

//   Object.keys   一个表示给定对象的所有可枚举属性的字符串数组。
//  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
function observe (data) {
  if (!data || typeof data !== 'object') {  // 暂时不考虑 数组
    return
  }
  // 取出所有的属性遍历
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key])
  })
}

function defineReactive (data, key, val) {
  observe(val)  // 监听子属性
  Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get: function () {
      return val
    },
    set: function (newVal) {
      console.log('newVal:', newVal)
      val = newVal
    }
  })
}