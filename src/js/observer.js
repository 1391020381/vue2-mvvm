var data = {name: 'kingdeng'}
observe(data)
data.name = 'dmq'

//   Object.keys   一个表示给定对象的所有可枚举属性的字符串数组。
//  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

function Observer (data) {
  this.data = data
  this.walk(data)
}

Observer.prototype = {
  walk: function (data) {
    var me = this
    Object.keys(data).forEach(key => {
      me.convert(key, data[key])
    })
  },
  convert: function (key, val) {
    this.defineReactive(this.data, key, val)
  },
  defineReactive: function (data, key, val) {
    var dep = new Dep()
    var childObj = observe(val)
    Object.defineProperty(data, key, {
      enumerable: true,  // 可以枚举
      configurable: false,  // 不能再define
      get: function () {
        if (Dep.target) {
          dep.depend()
        }
        return val
      },
      set: function (newVal) {
        if (newVal === val) {
          return
        }
        val = newVal
        // 新的值是Object 的话,进行监听
        childObj = observe(newVal)
        // 通知订阅者
        dep.notify()
      }
    })
  }
}

function observe (data) {
  if (!data || typeof data !== 'object') {  // 暂时不考虑 数组
    return
  }
  return new Observer(value)
}


/**
 * 消息订阅器,维护一个数组，用来收集订阅者,数据变动触发notify,再调用订阅者的update方法
 * **/
var uid = 0

function Dep () {
  this.subs = []
  this.id = uid++
}

Dep.prototype = {
  addSub: function (sub) {
    this.subs.push(sub)
  },
  depend: function () {
    Dep.target.addDep(this)
  },
  removeSub: function (sub) {
    var index = this.subs.indexOf(sub)
    if (index != -1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
Dep.target = null