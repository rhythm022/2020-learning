import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddImageService} from './add-image.service';
import {LoadImageService} from './load-image.service';
import {IPictureModel} from '../types';

@Injectable({
  providedIn: 'root'
})
// ★★★ service与service交互
export class TransferDataService {

  constructor(
    private client:HttpClient,
    private addImage:AddImageService,
    private loadImage:LoadImageService
  ) { }

  public Initialize():void{
    this.SubscribeToAddImageContextChanges()
    this.LoadImagesWithSubscription()
  }
  // 我的职责：下载照片，然后通知大家，剩下的我不管
  private LoadImagesWithSubscription() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/text',
      })
    };


    this.client.get<string[]>('http://localhost:3000/getPictures/', httpOptions).subscribe(pic=>{
      pic.forEach(img=>{
        this.client.get<IPictureModel>('http://localhost:3000/findPictureById/' + img).subscribe(pic1 =>{
          if(pic1 !== null)
            this.loadImage.add(pic1)
        })
      })
    })
  }


  // ★★★ 触发别人的方法有两种方式：拿到对方的生命/依赖注入、直接拿到对方的方法/emit机制/方法传参
  // 利用emit机制不需要拿到父组件的生命

  // 旧模式中，子组件承担了事件service的职能（父组件就是他的监听者），也承担了触发业务service的职能。
  // 事件模式中，组件不再承担触发业务service的职能，同时也把事件service的职能独立出来，而是触发独立的事件service:开启一个事件，在事件中触发业务service、触发组件

  // ★★★★ 事件模式中，一个方法属于一个业务service/监听者，并可能从属于多个事件service/事件类
  private SubscribeToAddImageContextChanges(){
    const httpOptions = {
      headers:new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }

    this.addImage.context.subscribe(msg=>{
      if(msg === null) return

      this.client.post<IPictureModel>('http://localhost:3000/addPicture/',msg,httpOptions).subscribe(callback => {
      })
    })
  }
}






































