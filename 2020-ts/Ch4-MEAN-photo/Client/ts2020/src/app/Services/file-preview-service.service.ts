import {Injectable} from '@angular/core';
import {IPictureModel, PictureModel} from '../types';

@Injectable({
  providedIn: 'root'
})
export class FilePreviewServiceService {

  /*校验、读取*/
  public async Preview(files: any): Promise<IPictureModel> {
    return new Promise((resolve, reject) => {
      if (files.length === 0) {
        return;
      }

      const file = files[0];
      if (file.type.match(/image\/*/) === null) {
        reject(`文件非图片文件`);
        return;
      }
      const imageModel: IPictureModel = new PictureModel();
      imageModel.Name = file.name;
      const reader = new FileReader();

      reader.onload = (evt) => {
        imageModel.Image = reader.result as string;
        resolve(imageModel);
      };
      reader.readAsDataURL(file);
    });
  }


  constructor() {
  }
}
