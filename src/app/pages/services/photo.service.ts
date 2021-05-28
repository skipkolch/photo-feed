import {Injectable} from '@angular/core';
import {CloudStorageService} from "./cloud-storage.service";

import {CameraPhoto, CameraResultType, CameraSource, Plugins} from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private storageService: CloudStorageService) {
  }

  public async takePhoto(): Promise<any> {
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });
    return this.savePicture(capturedPhoto);
  }

  private async savePicture(cameraPhoto: CameraPhoto) {
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
    return this.storageService.uploadFile(blob);
  }

}
