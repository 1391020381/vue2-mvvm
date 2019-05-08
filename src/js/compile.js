function Compile(el,vm){
  this.$vm = vm;
  this.$el = this.isElementNode(el)?el:document.querySelector(el);
  if(this.$el){
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
  }
}
Compile.prototype = {
  node2Fragment:function(el){ 
    var fragment = document.createDocumentFragment();
    var child;
    // 将原生节点拷贝到 fragment
    while(child = el.firstChild){  // 当 el.firstChild有值   id 为 app 元素下的 firstChild
      fragment.appendChild(child)
    }
    return fragment;
  },
  init:function(){
    this.compileElement(this.$fragment)
  },
  compileElement:function(el){
    var childNodes = el.childNodes;
    var me  = this;
    [].slice.call(childNodes).forEach(function(node){
      var text = node.textContent;
      var reg = /\{\{(.*)\}\}/;

    })
  },
  CompileText:function(node,exp){

  },
  isDirective:function(attr){
    return attr.indexOf('v-') === 0;
  },
  isEventDirective:function(dir){
    return dir.indexOf('on') === 0;
  },
  isElementNode:function(node){
   return node.nodeType ==1
  },
  isTextNode:function(node){
    return node.nodeType ==3
  }
}

var compileUtil = {
  text:function(node,vm,exp){
    this.bind(node,vm,exp,'text')
  },
  html:function(node,vm,exp){
    this.bind(node,vm,exp,'html')
  },
  model:function(node,vm,exp){
    this.bind(node,vm,exp,'model')
    var me = this
    
  },
  class:function(node,vm,exp){
    this.bind(node,vm,exp,'class')
  },
  bind:function(node,vm,exp,dir){
    var updaterFn = updaterFn[dir+'Updater']
    updaterFn && updaterFn(node,this._getVMVAL(vm,exp))
  },
  eventHandler:function(node,vm,exp,dir){
    var eventType = dir.split(':')[1]
    var fn = vm.$options.methods&&vm.$options.methods[exp]
    if(eventType && fn){
      node.addEventListener(eventType,fn.bind(vm),false)
    }
  },
  _getVMVAL:function(vm,exp){
      var val = vm
      var exp = exp.split('.')
      exp.forEach(function(k){
        val = val[k]
      })
  }
}


