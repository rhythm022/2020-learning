import {IRouter} from "./IRouter";
import {Response,Request} from "express";
import {Picture} from "../Database";

export class GetPicturesRouter implements IRouter{
    public AddRoute(route: any) {
     route.get('/getPictures/',(req:Request,res:Response)=>{
         Picture.distinct('_id',(err,picture)=>{
             if(err){
                 res.send(err)
             }else{
                 res.send(picture)
             }
         })

     })
    }
}
