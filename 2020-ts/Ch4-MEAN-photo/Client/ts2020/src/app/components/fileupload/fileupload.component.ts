import {Component, OnInit} from '@angular/core';
import {IPictureModel} from '../../types';
import {MatDialogRef} from '@angular/material';
import {FilePreviewServiceService} from '../../Services/file-preview-service.service';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.scss']
})
export class FileuploadComponent implements OnInit {
  protected imageSource: IPictureModel | null;
  protected message:any;
  protected description:string;
  protected tags:string

  constructor(
    private dialog:MatDialogRef<FileuploadComponent>,
    private preview:FilePreviewServiceService
  ) {
  }

  ngOnInit() {
  }

  /* :Preview，更新this.imageSource、this.message */
  public OnImageSelected(files:any):void{
    this.preview.Preview(files).then(r=>{
      this.imageSource = r
    }).catch(r=>{
      this.message = r
    })
  }

  /* 更新this.imageSource */
  public Save():void{
    this.imageSource.Description = this.description
    this.imageSource.Tags = this.tags

    this.dialog.close(this.imageSource)
  }










}
