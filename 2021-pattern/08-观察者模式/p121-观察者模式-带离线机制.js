//消息 === 事件 === trigger === 发送的行为


// 使用队列实现事件离线发布
// 重新发布/事件离线发布只有一次机会，就像即时发送的在线信息只会被发送一次，QQ的未读离线信息只会被发送一次。


//所以，如果接受者在线就发送，如果接收者不在线就存储“发送的行为”。并且，一旦接收者出现，就进行发送行为。



const Event = (function () {
    const namespaceCache = {}
    const _listen = function (store,key, fn ) {
        if (!store[key]) {
            store[key] = [];
        }
        store[key].push(fn);

    }
    const _remove = function (store,key, fn) {
        if (store[key]) {
            store[key].forEach((_fn,i)=>{
                if (_fn === fn) {
                    store[key].splice(i, 1);
                }
            })
        }
    }
    const _trigger = function (store,key,...args) {
        if (!store[key]) return

        return store[key].forEach(_fn=>_fn.call(this,...args))

    }

    // 创建命名空间：命名空间 === 闭包 === store、offlineTriggers变量
    const _createSpace = function (namespace = 'default') {
        if(namespaceCache[namespace]) return namespaceCache[namespace]

        const store = {}
        let offlineTriggers = []

        return namespaceCache[namespace] = {
            listen(key, fn) {
                _listen(store,key, fn );

                if (offlineTriggers) {
                    offlineTriggers.forEach(_fn=>_fn())

                    offlineTriggers = null;// 事件离线发布只有一次机会

                }

            },
            remove(key, fn) {
                _remove(store,key,fn);
            },
            trigger(key,...args) {
                const _fn = _trigger.bind(this,store,key,...args)

                if (offlineTriggers) {//★★★ 还没有listener，把trigger存下来
                    offlineTriggers.push(_fn);

                }else{
                    _fn();

                }
            }
        }
    };

    return {
        create: _createSpace,
        remove: function (key, fn) {
            const event = this.create();
            event.remove(key, fn);
        },
        listen: function (key, fn) {
            const event = this.create();
            event.listen(key, fn);
        },
        trigger: function (key,...args) {
            const event = this.create();
            event.trigger.call(this, key,...args);
        }
    };
})();

const func1 = (...args)=>{
    console.log('space1',...args)
}
Event.create('space1').listen('click',func1)
// Event.create('space1').remove('click',func1)
Event.create('space1').trigger('click')
Event.create('space2').trigger('click','test')

