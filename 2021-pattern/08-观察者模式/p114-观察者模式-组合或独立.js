function EventEmitter(){
    return {
        eventCallbacks:{},
        subscribe:function(eventName,cb){
            if(!this.eventCallbacks[eventName]){
                this.eventCallbacks[eventName] = []
            }
    
            this.eventCallbacks[eventName].push(cb)
        },
        trigger:function(...args){
            const eventName = args.shift()
            const fns = this.eventCallbacks[eventName]
    
            if(!fns || fns.length === 0)return false
    
            fns.forEach(func =>func.apply(this,args))
        },
        cancelSubscribe:function(eventName,cb){
            const fns = this.eventCallbacks[eventName]
    
            if(!fns || fns.length === 0)return false
    
            if(!cb) return fns.length = 0
    
            fns.forEach((func,i) =>{
                if(cb === func)fns.splice(i,1)
    
            })
    
        }
    }
}


const subscriberS = ()=>console.log('S')


// 组合
const installEvent = function(target){
    return Object.assign({},target,new EventEmitter())
}

const publisherA = installEvent({})
publisherA.subscribe('eventA',subscriberS)
publisherA.trigger('eventA')




// 独立
// 独立的缺点在于我们最终会搞不清楚事件/信息来自哪个模块，事件/信息优惠流向哪个模块
const globalSingleton = new EventEmitter()
globalSingleton.subscribe('eventA',subscriberS)
globalSingleton.trigger('eventA')