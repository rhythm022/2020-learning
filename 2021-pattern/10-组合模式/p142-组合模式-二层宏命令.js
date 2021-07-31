const {button,ball} = require('./helper')


function Command(func, ...args) {
  let preconditions = null

  return {
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
// 组合模式中的父类和子类，如MacroCommand和Command，是HAS-A聚合关系☆☆☆，MacroCommand包含Command，MacroCommand把请求委托给Command，而非IS-A
// 组合模式的特征是，一旦执行execute操作，组合树中的所有节点，都要执行execute操作
// 如果一个节点同时在两棵组合树中，该节点就会被执行两次execute操作，这就不适合组合模式。
// 对比责任链模式：请求顺着链条从父往子，或者从子往父传递，直到遇到可以处理该请求的对象。
const MacroCommand = function(){
  const cmds = []

  return {
    add(command){
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

