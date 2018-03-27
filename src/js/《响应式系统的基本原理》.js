function observer (value) {
  if (!value || (typeof value !== 'object')) {
    return;
  }
  Object.keys(value).forEach(key => {
    defineReactive(value, key, value[key])
  })
}

let obj = {a: 1, b: 2, c: 3}

let arr = [1, 2, 3, 4]

Object.keys(obj)   // ["a", "b", "c"]

Object.keys(arr)   // ["0", "1", "2", "3"]


function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiverGetter () {
      return val;
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return;
      cb(newVal)
    }
  })
}

function cb (val) {
  console.log('视图更新啦!', val)
}

class Vue {
  constructor (options) {
    this._data = options.data
    observer(this._data)
  }
}

let o = new Vue({
  data: {
    test: 'I am test'
  }
})
o._data.test = 'hello,test'