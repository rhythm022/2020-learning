const state = {
  whenWalk:{//whenWalk是状态，walk是请求，两者没有直接关系
    walk(){
      console.log('行走');
    },
    attack(){
      console.log('攻击');
    },
    defense(){
      console.log('防御');
    },
    jump(){
      console.log('跳跃');
    },
  },
  whenAttack:{
    walk(){
      throw new Error('不能行走')
    },
    defense(){
      throw new Error('不能防御')
    },
    jump(){
      throw new Error('不能跳跃')
    },
    attack(){
      console.log('攻击');
    },
  }
}
