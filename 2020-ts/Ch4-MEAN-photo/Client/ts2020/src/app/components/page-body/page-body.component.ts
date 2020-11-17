import { Component, OnInit } from '@angular/core';
import {IPictureModel} from '../../types';
import {AddImageService} from '../../Services/add-image.service';
import {LoadImageService} from '../../Services/load-image.service';
import {TransferDataService} from '../../Services/transfer-data.service';

@Component({
  selector: 'app-page-body',
  templateUrl: './page-body.component.html',
  styleUrls: ['./page-body.component.scss']
})
export class PageBodyComponent implements OnInit {
  Pictures:Array<IPictureModel>
  constructor(
    private addImage:AddImageService,
    private loadImage:LoadImageService,
    private transfer:TransferDataService
  ) {
    this.Pictures = new Array<IPictureModel>()
  }

  ngOnInit() {
    this.transfer.Initialize()

    this.addImage.context.subscribe(msg=>{
      if(!msg)return

      this.Pictures.push(msg)
    })
    this.loadImage.context.subscribe(msg=>{
      if(!msg)return

      this.Pictures.push(msg)
    })
  }

}































