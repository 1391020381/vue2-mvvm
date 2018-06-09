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
# 基本流程
  1. 解析模板最终生成render函数
  2. 初次渲染时,直接执行render函数(执行过程中，会触发Model属性的get从而绑定依赖)。render函数会生成vnode,
  然后patch到真实的DOM中,完成View的渲染
  3. Mode属性发生变化时,触发通知,重新执行render函数,生成newVnode，然后patch(vnode,newVnode),针对两者进行diff
  算法,最终将有区别的部分重新渲染。
  4. Mode属性再次发生变化时,又会触发通知
  5. 另外,还有一个重要的信息。如果连续修改多个Model属性,那么会连续触发通知、重新渲染View?——肯定不会,View的渲染时异步的。`即,Vue会一次性集合多个Model的变更,最后一次性渲染View,提高性能`