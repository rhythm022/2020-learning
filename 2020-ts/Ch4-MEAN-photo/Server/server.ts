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

    // routingEngine是传入的
    protected abstract AddRouting(routingEngine:RoutingEngine,router:any):void

    public WithCorsSupport(): Server {
        this.app.use(cors())
        return this
    }

    public Start(): void {
        this.app.use(bodyParser.json({limit: `100mb`}))
        this.app.use(bodyParser.urlencoded({limit: `100mb`, extended: true}))

        this.mongo.Connect()
        this.router = express.Router()
        this.AddRouting(this.routingEngine,this.router)
        //
        this.OnStart();
        this.app.listen(this.port, () => console.log(`Express server running on port ${this.port}`))
    }


    protected OnStart(): void {
    }
}

























