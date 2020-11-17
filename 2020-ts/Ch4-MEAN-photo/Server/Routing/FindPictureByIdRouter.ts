import {IRouter} from "./IRouter";
import {Response,Request} from "express";
import {Picture} from "../Database";

export class FindPictureByIdRouter implements IRouter{
    public AddRoute(route: any) {
     route.get('/findPictureById/:id',(req:Request,res:Response)=>{

         Picture.findOne({_id:req.params.id},'-_id',(err,picture)=>{
             if(err){
                 res.send(err)
             }else{
                 res.json(picture)
             }
         })

     })
    }
}
