const state = {//子对象为字面量对象，父对象为类对象。子对象没有自己的上下文，而是和父对象共用一个上下文
  whenOff:{
    press(){
      console.log('弱光');
      this.cur = state.whenWeak
    }
  },
  whenWeak:{
    press(){
      console.log('强光');
      this.cur = state.whenStrong
    }
  },
  whenStrong:{
    press(){
      console.log('关灯');
      this.cur = state.whenOff
    }
  }
}




class Context{
  constructor() {
    this.cur = state.whenOff
  }
  press(){
    this.cur.press.call(this)
  }
}



const context = new Context()

context.press()
context.press()
context.press()
context.press()

