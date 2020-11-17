import {IRouter} from "./IRouter";
import {Response,Request} from "express";
import {Picture} from "../Database";

export class AddPictureRouter implements IRouter{
    public AddRoute(route: any) {
     route.post('/addPicture',(req:Request,res:Response)=>{

         const picture = new Picture(req.body)
         picture.save((err,picture)=>{
             if(err){
                 res.send(err)
             }else{
                 res.json(picture)
             }
         })
     })
    }
}
