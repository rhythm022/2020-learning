// subscribe === listen === register === collect === inject
// publisher === eventer
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


const dependencyX = ()=>console.log('X')


const installSlot = function(target){
    return Object.assign({},target,new Slot())// 组合
}

// 依赖一个带slot的子对象，意味着该父对象会被部分修改。如果一个slot子对象被多个对象拥有，就会有多个父对象被修改。
const child = installSlot({})//子对象
child.inject('slotA',dependencyX)// 父调子inject，以部分暴露自己给子类。
child.use('slotA')// 实现有限度的子调父

////////////////////////////////////////////////////


const slot = new Slot()// 独立的中介子对象
slot.inject('slotA',dependencyX)// 任何拥有中介的父对象把自己部分暴露给中介
slot.use('slotA')// 任何拥有中介的父对象都可以通过中介改变其他父对象



// 拥有 === 依赖
