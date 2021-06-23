const button = {
  __event: {},
  addEventListner(eventName, func)  {
    this.__event[eventName] = func
  },
  trigger(eventName) {
    this.__event[eventName] && this.__event[eventName]()
  }
}


const ball = {
  move: ( x = 0) => console.log(`移动小球至${x}px`)
}


module.exports = {
  button,
  ball
}
