function h(tagName,attributes,...children){
    let el = document.createElement(tagName)

    for (let p in attributes){
        el.setAttribute(p,attributes[p])
    }

    for (let child of children){
        if(typeof child === 'string'){
            child = document.createTextNode(child)
        }

        el.appendChild(child)
    }

    return el
}

// dom 树从树底开始构建，上层的节点是以下层节点为入参的
// 每个节点的构建以实node为输出
window.div = <div id="1" class="row">
    <div>1</div>
    <div>2</div>
    <div>3</div>
</div>