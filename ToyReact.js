class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type);
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(vchild) {
    vchild.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

export class Component {
  constructor() {
    this.children = [];
  }
  setAttribute(name, value) {
    this[name] = value;
  }
  appendChild(vchild) {
    this.children.push(vchild);
  }
  mountTo(parent) {
    const vdom = this.render();
    vdom.mountTo(parent);
  }
}

export const ToyReact = {
  createElement(type, attributes, ...children) {
    console.log(arguments);
    console.log(children,'children')
    let element;
    if (typeof type === 'string') {
      element = new ElementWrapper(type);
    } else {
      element = new type;
    }
    for (let name in attributes) { // set dom attribute
      element.setAttribute(name, attributes[name]);
    }
    const insertChildren = children => {
      for (let child of children) {
        console.log(child,'dd')
        if (typeof child === 'object' && child instanceof Array) {
          insertChildren(child);
        } else {
  
          if (!(child instanceof ElementWrapper)
                && !(child instanceof TextWrapper)
                && !(child instanceof Component))
                child = String(child);
          if (typeof child === 'string') {
            child = new TextWrapper(child);
          }
          element.appendChild(child);
        }
      }
    }
    insertChildren(children);
    return element;
  },

  render(vdom, element) {
    vdom.mountTo(element);
  }
}