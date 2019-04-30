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
  CompileText:function(node,exp){},
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