class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }

  notify () {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}

class Watcher {
  constructor () {
    Dep.target = this
  }

  update () {
    console.log('视图刷新了')
  }
}

function observer (value) {
  if (!value || (typeof value !== 'object')) {
    return
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

function defineReactive (obj, key, val) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      if (Dep.target) {  // 全局的 Dep 对象  在 初始化 Watcher实例的时候,把 Dep.target 赋值为 Watcher的实例<全局唯一>
        dep.addSub(Dep.target)
        console.log('get-value')
      }
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      dep.notify()
      console.log('set-value')
    }
  })
}


class Vue {
  constructor (options) {
    this._data = options.data
    observer(this._data)
    new Watcher()   // 全局的 Watcher实例
    console.log('render!', this._data.test)     // 这个 this._data.test  会触发 get
  }
}

let o = new Vue({
  data: {
    test: 'I am test'
  }
})
o._data.test = 'hello,test'
Dep.target = null

