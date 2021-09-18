// 父调子，是且至少是HAS-A聚合关系。

const ball = {
    move: ( x = 0) => console.log(`移动小球至${x}px`)
}

// 组合层是n叉树结构
// 以组合层结合命令层为例：以命令层作为组合叶子，即组合层的下层
function Command(fn,that,...args) {
    return {
        execute() {
            fn.apply(that,args)
        }
    }
}



// 宏命令即组合层
// 基于多态/接口一致，使得父函数不需区分组合层和组合叶子。
const MacroCommand = function(){
    const children = []// 数组式对象(而非链表式对象)

    return {
        add(command){// 组合层比组合叶子多了add方法
            children.push(command)
        },
        execute(){// 为父函数迭代函数
            children.forEach(cmd=>cmd.execute())
        }
    }
}
const command1 = Command(ball.move,ball,1)// 包一层
const command2 = Command(ball.move,ball,2)
const command3 = Command(ball.move,ball,3)

const command0 = MacroCommand()

command0.add(command1)// 再包一层
command0.add(command2)
command0.add(command3)

const command4 = Command(ball.move,ball,4)
const command00 = MacroCommand()

command00.add(command0)
command00.add(command4)

command00.execute()
// 如果一个节点出现在一棵组合树的不同位置，该节点就会被执行两次，这就不适合使用组合树。


// 组合层用于批量对组织中的大量对象做相同操作
// 组合层，有可能需要让请求从子对象往父对象"冒泡"传递，这时增加parent属性就可以☆☆☆
