# vue2-mvvm
vue2原理的学习
# 学习资料
1. [learn-vue2-mvvm](https://github.com/wangfupeng1988/learn-vue2-mvvm)
2. [mvvm](https://github.com/DMQ/mvvm)
   1. 实现一个数据监听器Observer,能够对数据对象的所有属性进行监听,如有变动可拿到最新值并通知订阅者
   2. 实现一个指令解析器Compile,对每个元素节点的指令进行扫描和解析,根据指令模板替换数据,以及绑定相应的更新函数
   3. 实现一个Watcher,作为连接Observer和Complier的桥梁,能够订阅并收到每个属性变动通知,执行指令绑定的相应回调函数,从而更新视图
   4. mvvm入口函数,整合以上三者
   
  ![](https://github.com/1391020381/vue2-mvvm/blob/master/src/img/2.png)