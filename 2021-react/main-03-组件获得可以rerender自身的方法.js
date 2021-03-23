
const RENDER_TO_DOM = Symbol('render_to_dom')

class ElementWrapper {
    constructor(tagName) {
        this.root = document.createElement(tagName);
    }

    setAttribute(name, value) {
        this.root.setAttribute(name, value)
    }

    appendChild(component) {
        //range代表自己的这个实dom
        let range = document.createRange()
        range.setStart(this.root, this.root.childNodes.length)
        range.setEnd(this.root, this.root.childNodes.length)

        component[RENDER_TO_DOM](range)//★原来是他/root过来，现在是我\range\父节点过去。
    }
    [RENDER_TO_DOM](range) {
        // range代表上节点
        range.deleteContents()
        range.insertNode(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    [RENDER_TO_DOM](range) {//★原来提供root，现在提供方法。使得该类获得了重新渲染自身的能力
        range.deleteContents()
        range.insertNode(this.root)
    }
}


class Component {
    constructor() {
        this.props = Object.create(null)
        this.children = []
        this._root = null
        this._range = null

    }

    setAttribute(name, value) {
        this.props[name] = value
    }

    appendChild(component) {
        this.children.push(component)
    }
    [RENDER_TO_DOM](range) {
        this._range = range//★
        this.render()[RENDER_TO_DOM](range)
    }
    rerender() {
        this._range.deleteContents()
        this[RENDER_TO_DOM](this._range)
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
    let range = document.createRange()
    range.setStart(parentElement, 0)
    range.setEnd(parentElement, parentElement.childNodes.length)
    range.deleteContents()

    component[RENDER_TO_DOM](range)
}

class MyComponent extends Component {
    render() {
        return <div>
            0
            {this.children}
        </div>
    }
}


const div = window.div = <MyComponent id="1" class="row">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</MyComponent>

render(div, document.querySelector('BODY'))