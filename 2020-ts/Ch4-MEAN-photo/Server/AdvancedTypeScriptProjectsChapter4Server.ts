import {Server} from "./server";
import {RoutingEngine} from "./Routing/RoutingEngine";
import {AddPictureRouter} from "./Routing/AddPictureRouter";
import {GetPicturesRouter} from "./Routing/GetPicturesRouter";
import {FindPictureByIdRouter} from "./Routing/FindPictureByIdRouter";

export class AdvancedTypeScriptProjectsChapter4Server extends Server{
    protected AddRouting(routingEngine: RoutingEngine, router: any):void {
        routingEngine.Add(AddPictureRouter,router)
        routingEngine.Add(GetPicturesRouter,router)
        routingEngine.Add(FindPictureByIdRouter,router)
    }
}


new AdvancedTypeScriptProjectsChapter4Server(3000).WithCorsSupport().Start()
