// RoutingEngine是帮助类
import {IRouter} from "./IRouter";

export class RoutingEngine{
    constructor(
        private routing:IRouter[] = new Array<IRouter>()
    ) {
    }

    // 重要
    public Add<T extends IRouter>(routing:(new ()=>T),route:any){
        const routed = new routing()
        routed.AddRoute(route)
        this.routing.push(routed)
    }

}










































