const EventEmitter = function (){
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





const installEvent = function(target){
    return Object.assign({},target,new EventEmitter())
}

const publisher = installEvent({})
const subscriberS = ()=>console.log('S')
const subscriberSS = ()=>console.log('SS')
publisher.subscribe('eventA',subscriberS)
publisher.subscribe('eventA',subscriberSS)
publisher.trigger('eventA')
publisher.cancelSubscribe('eventA',subscriberS)
publisher.trigger('eventA')