# 响应式
1. Object.definePropery(obj,key,{
  get :function reactiveGetter(){
    enumerable:true,
    configurable:true,
    get:()=>{
      if(Dep.target){
        dep.addSub(Dep.target)
      }
    },
    set:new =>{
      dep.notify()
    }
  },
  set:function reactiveSetter(newVal){}
})
2.  class Dep (){
  constructor () {
    this.subs = []
  }
  addSub(sub:Watcher){
    this.subs.push(sub)
  }
  removeSub(sub:Watcher){
    remov(this.subs,sub)
  }
  notify(){
    const  subs = this.subs.slice()
    for(let i =0 ,l = subs.length;i<1;i++){
      subs[i].update()
    }
  }
}
Dep.target = null
3. class Watcher(){
  constructor (vm,expOrFn,cb,options){
    this.cb = cb
    this.vm = vm
    Dep.target  = this
    this.cb.call(this.vm)
  }
}
# 模板解析
1. parser 将模板处理为AST,抽象语法书(Abstract Syntax Tree)。正如浏览器将HTML代码处理为结构化的DOM树一样,Vue将模板处理为结构化的AST,每个节点都包含了标签、属性以及
2. optimize 优化AST，找到最大静态子树。这一步就是要分清楚,在AST当中,哪些是动态的,哪些是静态的。其实,通过判断该节点有没有关联就可以判断。指令中绑定了Model的数据,Model一更新,动态的节点肯定要随时更新。而静态节点和Model都没有关系,因此只更新一次即可。总之,第二步就是提高后面更新View的效率。
3.生成render函数  generate 生成render函数,将模板字符串转换为JS真正可执行的函数。
4. 总结
  * 不同的指令,生成render函数会不一样。指令越多,render函数会变的越复杂
  * 如果有静态的节点,将不会在render函数中体现,而是在 staticRenderFns中体现。静态节点只会在初次显示View的时候被执行,后续的Model变化将不会再触发静态节点的渲染。
 # 虚拟DOM 
##  vdom的基本使用
* 浏览器中解析html会生成DOM树,它是由一个一个的node节点组成。同理,vdom也是由一个一个的vnode组成。vdom、vnode都是用js对象的方式来模拟真实的DOM或者node
1.  [ Snabbdom](https://github.com/snabbdom/snabbdom)
## render函数生成vnode
* 在Vue中render函数就会生成vnode
###基本流程
  1. 解析模板最终生成render函数
  2. 初次渲染时,直接执行render函数(执行过程中，会触发Model属性的get从而绑定依赖)。render函数会生成vnode,
  然后patch到真实的DOM中,完成View的渲染
  3. Mode属性发生变化时,触发通知,重新执行render函数,生成newVnode，然后patch(vnode,newVnode),针对两者进行diff
  算法,最终将有区别的部分重新渲染。
  4. Mode属性再次发生变化时,又会触发通知
  5. 另外,还有一个重要的信息。如果连续修改多个Model属性,那么会连续触发通知、重新渲染View?——肯定不会,View的渲染时异步的。`即,Vue会一次性集合多个Model的变更,最后一次性渲染View,提高性能`

  ![](https://raw.githubusercontent.com/1391020381/vue2-mvvm/master/src/img/vue%E6%B5%81%E7%A8%8B.png)