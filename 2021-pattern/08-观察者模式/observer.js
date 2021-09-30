// subscribe === listen === register === collect === inject
// publisher === eventEmitter === slot
function Slot(){
  return {
    dict:{},
    inject(slot,cb){
      const {dict} = this

      if(!dict[slot])dict[slot] = []

      dict[slot].push(cb)
    },
    use(...args){
      const {dict} = this

      const slot = args.shift()

      if(!dict[slot] || dict[slot].length === 0)return false

      dict[slot].forEach(func =>func.apply(this,args))
    },
    // free(slot,cb){
    //     const {dict} = this
    //
    //     if(!dict[slot] || dict[slot].length === 0)return false
    //
    //     if(!cb) return dict[slot].length = 0
    //
    //     dict[slot].forEach((func,i) =>{
    //         if(cb === func)dict[slot].splice(i,1)
    //
    //     })
    //
    // }
  }
}

const installSlot = function(target){
  return Object.assign({},target,new Slot())// 组合
}


module.exports = {
  Slot,
  installSlot
}
