const {button,ball} = require('./helper')
function Command(func, ...args) {
  let preconditions = null
  let parent = null

  return {
    parent,
    execute() {
      preconditions = 'x'
      func(...args)
    },
    undo(){
      console.log(preconditions);
      func(preconditions)
    },
  }
}




////////////////////////////////////////////////////////////////
// 组合模式中，使用责任链，有可能需要让请求从子节点往父节点"冒泡"传递，这就需要增加parent属性☆☆☆
const MacroCommand = function(){
  const cmds = []
  let parent = null

  return {
    add(command){
      command.parent = this
      cmds.push(command)
    },
    execute(){
      cmds.forEach(cmd=>cmd.execute())
    },
    undo(){
      let command
      while(command = cmds.pop()){
        command.undo()
      }
    },
  }
}

const macro = MacroCommand()
const command1 = Command(ball.move,1)
const command2 = Command(ball.move,2)
const command3 = Command(ball.move,3)

macro.add(command1)
macro.add(command2)
macro.add(command3)


const macro2 = MacroCommand()
macro2.add(macro)
macro2.add(macro)


macro2.execute()
