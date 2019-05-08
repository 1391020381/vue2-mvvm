1. Observe 能够对数据对象的所有属性进行监听,如有变动可拿最新值 通知订阅者(Watcher)
2. 指令解析器Compile 对每个元素节点的指令进行扫描和解析,根据指令模板替换数据,以及绑定相应的更新函数。
3. Watcher 连接 Observer 和Compile的桥梁 能够订阅并收到每个属性变动的通知,执行指令绑定的相应回调函数,从而更新视图。



* Observe Dep  Dep.target

* Object.defineProperty() 方法会直接在一个对象上 定义一个新属性   或者修改一个对象的现有属性,并返回对象。

* 节点类型常量
1. Node.ELEMENT_NODE   1 元素节点  <p> <div>
2. Node.TEXT_NODE      3 Element 或者 Atrr 中实际的文字



# compile
1. 获取 #app 下面的 firstChild    el.firstChild
2. compileElement 处理 指令
* 处理指令 时 会 
 ```
 new  Watcher(vm,exp,function(value,oldValue){
   updaterFn && updaterFn(node,value,oldValue)
 })

```

# Watcher
* new Watcher 时 会获取 this.get() 
* this.get() 会把 Dep.target = this(Watcher 实例) 获取完值 再赋值为 null
* 在这个过程中,会触发 observer   
```
Object.defineProperty(data,key,{
  enumerable:true,
  configurable:false,
  get:function(){
    if(Dep.target){  // 收集依赖
      dep.depend()
    }
    return val
  },
  set:function(newVal){
    if(newVal === val){
      return;
    }
    val = newVal
    childObj = observe(newVal)
    dep.notify()
  }
})


```
* Dep.target.addDep(this)
```
if(!this.depIds.hasOwnProperty(dep.id)){
  dep.addSub(this)  // 收集依赖 this Watcher实例
  this.depIds[dep.id] = dep
}


```

# 大概总结
1. proxyData
```
Object.defineProperty(me,key,{
  get:function proxyGetter(){
    return me._data[key]
  },
  set:function proxySetter(newVal){
    me._data[key] = newVal
  }
})

```
2. computed  Object.defineProperty            get

3. observe
  1. 对 options.data进行 observe
  2. Dep.target 为真 Dep.target.addDep(this) 收集依赖   this Dep 实例？
  3.  
    ```
    if(!this.depIds.hasOwnProperty(dep.id)){
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }

    ```
4. compile 处理 元素的上的 指令 或模板 时 会 new Watcher(vm,exp,function(value,oldValue){
  updaterFn && updaterFn(node,value,oldValue)
})
* 实例化 Watcher时,会触发 this.get()  Dep.target = this;
* 当 用户操作 options.data中的值得时候,会触发Object.defineProperty  set 并触发 dep.notify
* dep.notify    sub.update()
* sub 是 watcher实例    其实就是执行绑定的回调函数



* 不同地方 this的 指向
* ```
Dep.prototype = {
  Dep.target.addDep(this)   this   Dep 实例    compile阶段 实例化 Watcher 触发 this.get()  会触发 observer  Object.defineProperty get 实际上是 调用 Watcher的 addDep方法并传入 Dep实例。  addDep中 使用 传入的 dep 依赖收集 添加watcher对象    Object.defineProperty set 时触发  dep.notify()实际就是触发 watcher回调
}


Watcher.prototype = {
  addDep:function(dep){
    if(!this.depIds.hasOwnProperty(dep.id)){
      dep.addSub(this)    this   Watcher 实例
      this.depIds[dep.id] = dep
    }
  }
}
```


