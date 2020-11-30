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


  // 我的职责是：一旦有新增，我就上传，剩下我不管
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






































