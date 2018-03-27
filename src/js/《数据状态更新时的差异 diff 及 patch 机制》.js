function pathVnode (oldVnode, vnode) {
  if (oldVnode === vnode) {
    return
  }
  if (vnode.isStatic && oldVnode.isStatic && vnode.key === oldVnode.key) {
    vnode.elm = oldVnode.elm
    vnode.componentInstance = oldVnode.componentInstance
    return
  }
  const elm = vnode.elm = oldVnode.elm
  const oldCh = oldVnode.children
  const ch = vnode.children
  if (vnode.text) {

  }
}

const nodeOps = {
  setTextContent () {

  },
  parentNode () {

  },
  removeChild () {

  },
  nextSibling () {

  },
  insertBefore () {

  }
}