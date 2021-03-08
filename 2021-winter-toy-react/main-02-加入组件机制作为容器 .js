// MyComponent和'div'都是信息提供者
// 他们提供的信息还不够
// MyComponent的信息和attributes的信息和children的信息在h函数这个得到合并
// h函数会把三者储存成“一个”节点单位，再向上传递
// 这里不再另创实例，而是把三者的信息都放在已有的MyComponent实例中
// 当组件被上节点作为children使用时，再走第二遍h函数，把存在实例内的children信息作为attributes或children或其变形传入h函数
// 第一次tagname是组件，第二次一般是普通节点。
// 这个节点单位应该对外有统一的接口，目前接口中有的属性有：root。root语义是实dom

// MyComponent的实例向上传递/作为children/作为下节点/被使用时，才会把在他这里的三者信息转化成实dom输出，也依赖于h函数。
// MyComponent的下节点只能来自于他内部的render内的下节点
// 上节点和下节点时因为root耦合的
// 当下节点都是实dom，上节点是普通节点，h函数整合后就是“整个的实dom”的wrapper。
// 当下节点都是实dom，上节点是组件，h函数整合后就是拥有实dom的组件实例。
// 下节点只能是实dom
class ElementWrapper {
    constructor(tagName) {
        this.root = document.createElement(tagName);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        this.root.appendChild(component.root);
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
}

// Component的输入是render函数的返回
class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._root = null

    }

    setAttribute(name, value) {
        this.props[name] = value
    }

    appendChild(component) {
        this.children.push(component)
    }

    get root() {
        if (!this._root) {
            this._root = this.render().root
        }

        return this._root
    }
}
function h(tagName, attributes, ...children) {
    let el = (function () {
        if (typeof tagName === 'string') {
            return new ElementWrapper(tagName)
        } else {
            return new tagName
        }
    })()

    for (let p in attributes) {
        el.setAttribute(p, attributes[p])
    }

    const append = (children) => {
        for (let child of children) {
            if (typeof child === 'string') {
                child = new TextWrapper(child)
            }
            if (typeof child === 'object' && child instanceof Array) {
                append(child)
            } else {
                el.appendChild(child)
            }

        }
    }

    append(children)


    return el
}


function render(component, parentElement) {
    parentElement.appendChild(component.root)
}

class MyComponent extends Component {
    render() {
        return <div>
            0
            {this.children}
        </div>
    }
}

// 加入MyComponent组件节点后，每个节点构建还是以实dom为输出。
window.div = <MyComponent id="1" class="row">
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </MyComponent>

