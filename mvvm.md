1. Observe 能够对数据对象的所有属性进行监听,如有变动可拿最新值 通知订阅者(Watcher)
2. 指令解析器Compile 对每个元素节点的指令进行扫描和解析,根据指令模板替换数据,以及绑定相应的更新函数。
3. Watcher 连接 Observer 和Compile的桥梁 能够订阅并收到每个属性变动的通知,执行指令绑定的相应回调函数,从而更新视图。



* Observe Dep  Dep.target