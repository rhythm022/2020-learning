import express from 'express'
import bodyParser from "body-parser";
import cors from 'cors'
import {Mongo} from "./Database";
import {RoutingEngine} from "./Routing/RoutingEngine";

export abstract class Server {
    private router:any
    constructor(
        private port: number = 3000,
        private app: any = express(),
        private mongo:Mongo = new Mongo(),
        private routingEngine:RoutingEngine = new RoutingEngine()
    ) {
    }

    // ★★★ routingEngine被传入，这是依赖注入作为实例方法的入参。提高可读性？？
    // ★★★ routingEngine是服务，router是甲乙方
    // ★★★ 单独解耦出配置路由的逻辑，为了另起一个专门的易变的路由文件
    //:=>routingEngine.Add
    protected abstract AddRouting(routingEngine:RoutingEngine,router:any):void

    // 配置
    // ★★★ 单独解耦出配置跨域的逻辑，为了单独配置跨域
    public WithCorsSupport(): Server {
        this.app.use(cors())
        return this
    }

    // 配置
    //:=>mongo.Connect、AddRouting
    public Start(): void {
        this.app.use(bodyParser.json({limit: `100mb`}))
        this.app.use(bodyParser.urlencoded({limit: `100mb`, extended: true}))
        //点
        this.mongo.Connect()
        //点
        this.router = express.Router()
        this.AddRouting(this.routingEngine,this.router)
        this.app.use(this.router);
        //
        this.OnStart();
        this.app.listen(this.port, () => console.log(`Express server running on port ${this.port}`))
    }


    protected OnStart(): void {
    }
}


























