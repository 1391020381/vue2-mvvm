# 什么是MVVM
 * Model View ViewModel
   1. View(dom)
   2. ViewModel<dom listeners data Bindings>(Vue)
   3. Model(Plain JavaScript Objects)
 * Vue2 MVVM几大要素
   1. 响应式(观察者模式)<Vue是对初始化时Model中的以有的数据进行监听。如果初始化完成,再去手动扩展Model的属性,新扩展的就无法进行监听了,除非使用Vue提供的特有的扩展API>
   2. 模板引擎(模板引擎会把一个html片断最终解析成一个JS函数,让它真正动起来
   )
   3. 虚拟DOM(ViewModel不会直接操作dom而是把所有的DOM操作都一股脑塞给vdom,，vdom 进行 diff 之后，再决定要真正修改哪些 DOM 节点)
 # 响应式[深入响应式原理](https://cn.vuejs.org/v2/guide/reactivity.html)  
   1. Object.defineProperty(obj, prop, descriptor)只能某个对象的单个属性
   2. 数组的变化监听(直接修改要监听的数组的原型,不是 Array.prototype)
      ```
      var arr1 = [1, 2, 3]
      var arr2 = [100, 200, 300]
      arr1.__proto__ = {
          push: function (val) {
              console.log('push', val)
              return Array.prototype.push.call(arr1, val)
          },
          pop: function () {
              console.log('pop')
              return Array.prototype.pop.call(arr1)
          }
          // 其他原型方法暂时省略。。。。
      }
      
      arr1.push(4)    // 可监听到
      arr1.pop()      // 可监听到
      arr2.push(400)  // 不受影响
      arr2.pop()      // 不受影响
      ``` 
     3.  Vue包含一组观察数组的变异方法,所以它们也将触发视图更新[列表渲染](https://cn.vuejs.org/v2/guide/list.html)
          * push()
          * pop()
          * shift()
          * unshift()
          * splice()
          * sort()
          * reverse()
     4. 对象更改检测注意事项
        * 由于JavaScript的限制,Vue不能检测对象属性的添加或删除。对于已经创建的实例,Vue不能动态添加 根级别的响应属性。但可以使用Vue.set(object.key,value)   
        *  有时你可能需要为已有对象赋予多个新属性,在这个情况下，你应该用两个对象属性创建一个新的对象。如下：
        ```
        vm.userProfile = Object.assign({}, vm.userProfile, {
          age: 27,
          favoriteColor: 'Vue Green'
        })
        ```
   # 模板解析 
     1. 结构化解析
          *  生成AST,
          * 优化AST找到最大静态子树<标记最大静态子树的用意：根据MVVM的交互方式,Model的数据修改要同时修改View,那些View中和Model没有关系的部分,就没有必要随着Model的变化而修改。提高效率。
     2. 要生成vdom
     3. 渲染为页面 
  # 虚拟DOM
   * 围绕着 vdom来介绍View的渲染,包括View的渲染和更新、以及响应式如何触发这种更新机制。
   ## vdom的基本使用
   * 浏览器中解析 html会生成DOM树,它是由一个一个的node节点组成。同理，vdom也是由一个一个的vnode组成。vdom、vnode都是用js对象的方式来模拟真实的DOM或者node.
   * 生成新的vnode,然后 patch(vnode,newVnode),会使用diff算法出对比vnode和newVnode,比对两者的区别,最后渲染真实DOM时候,只会将有区别的部分重新渲染。           