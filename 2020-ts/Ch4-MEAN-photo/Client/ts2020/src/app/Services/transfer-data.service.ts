import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AddImageService} from './add-image.service';
import {LoadImageService} from './load-image.service';
import {IPictureModel} from '../types';

@Injectable({
  providedIn: 'root'
})
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
  // 初始化时加载图片
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


  // 增加图片时自动上传
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






































