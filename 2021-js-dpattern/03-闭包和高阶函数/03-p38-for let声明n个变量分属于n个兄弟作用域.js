const nodes = [{},{},{},{},{}]
for (let i = 0; i < 5; i++) {
    // 5个i分属于5个兄弟作用域
    nodes[i].onclick = function(){
        console.log(i)
    }
    
}


nodes[0].onclick()
nodes[1].onclick()
nodes[2].onclick()
nodes[3].onclick()
nodes[4].onclick()

for (var i = 0; i < 5; i++) {
    // 1个i在全局作用域
    nodes[i].onclick = function(){
        console.log(i)
    }
    
}


nodes[0].onclick()
nodes[1].onclick()
nodes[2].onclick()
nodes[3].onclick()
nodes[4].onclick()


