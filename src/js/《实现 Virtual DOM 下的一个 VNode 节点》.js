class VNode {
  constructor (tag, data, children, text, elm) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
  }
}

function createEmptyVNode () {
  const node = new VNode()
  node.text = ''
  return node
}

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

function cloneVnode (node) {
  const cloneVnode = new VNode(
    node.tag,
    node.data,
    node.children,
    node.elm
  )
  return cloneVnode
}