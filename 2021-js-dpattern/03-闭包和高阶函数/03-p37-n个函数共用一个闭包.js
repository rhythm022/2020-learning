const nodes = document.getElementsByTagName('div')

// n个函数共用一个闭包
for (let index = 0; index < nodes.length; index++) {
    nodes[index].onclick = function(){
        console.log(index)
    }
    
}