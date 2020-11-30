// RoutingEngine是帮助类
import {IRouter} from "./IRouter";

export class RoutingEngine{
    constructor(
        private routing:IRouter[] = new Array<IRouter>()
    ) {
    }

    // ★★★ routing:(new ()=>T)
    // ★★★ 该方法不仅:=>routed.AddRoute把路由注册到第三方库上，还在自己的类实例上存了一份IRouter。
    // -改变了类实例的状态
    // ★★★ 如果不存一份IRouter，不如直接routed.AddRoute，根本不需要RoutingEngine
    // - RoutingEngine集中了所有注册的路由
    // ★★★ IRouter这个自定义的语义为路由的类，提供了以后增加逻辑/代码的空间
    public Add<T extends IRouter>(routing:(new ()=>T),route:any){
        const routed = new routing()
        routed.AddRoute(route)
        this.routing.push(routed)
    }

}










































