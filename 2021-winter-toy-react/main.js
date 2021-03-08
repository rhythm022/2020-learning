
const RENDER_TO_DOM = Symbol('render_to_dom')

class ElementWrapper {
    constructor(tagName) {
        this.root = document.createElement(tagName);
    }

    setAttribute(name, value) {
        if(name.match(/^on([\s\S]+)$/)){
            this.root.addEventListener(RegExp.$1.replace(/^[\s\S]/,c=>c.toLowerCase()),value)
        }else{
            this.root.setAttribute(name, value)

        }
    }

    appendChild(component) {
        let range = document.createRange()
        range.setStart(this.root, this.root.childNodes.length)
        range.setEnd(this.root, this.root.childNodes.length)

        component[RENDER_TO_DOM](range)
    }
    [RENDER_TO_DOM](range) {
        range.deleteContents()
        range.insertNode(this.root)
    }
}

class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content)
    }
    [RENDER_TO_DOM](range) {
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
        this._range = range
        this.render()[RENDER_TO_DOM](range)
    }
    rerender() {
        this._range.deleteContents()
        this[RENDER_TO_DOM](this._range)
    }

    setState(newState){
        if(this.state === null || typeof this.state !== 'object'){// ★null是object，但不是容器
            this.state = newState

            this.rerender()// 完全删除并新建该组件所管理的实dom

            return 
        }

        let merge = (oldState,newState)=>{
            for (const name in newState) {
                if(oldState[name] === null || typeof oldState[name] !== 'object'){
       
                    oldState[name] = newState[name]
                
                }else{
                    merge(oldState[name],newState[name])
                }
            }
         
        }

        merge(this.state,newState)
        this.rerender()// 完全删除并新建该组件所管理的实dom

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
    constructor() {
        super()
        this.state = {
            a: 0,
            b:2
        }
    }
    render() {
        return <div>
            <button onclick={()=>{ this.state.a++;this.rerender() }}>add</button>
            <button onclick={()=>{ this.setState({a:this.state.a + 1}) }}>ADD</button>
            {this.state.a.toString()}
            <br/>
            {this.state.b.toString()}
        </div>
    }
}


const div = window.div = <MyComponent id="1" class="row">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</MyComponent>

render(div, document.querySelector('BODY'))