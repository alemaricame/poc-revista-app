import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CameraResultType, CameraSource, Plugins } from '@capacitor/core';
import { ToastController } from '@ionic/angular';

import * as moment from 'moment';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  num_empleado; 
  password;
  date_empleado;

  photo: SafeResourceUrl;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    public toastController: ToastController,
    private users: UserService
  ) { }

  ngOnInit() {
  }

  back(){
    this.router.navigateByUrl('/portada')
  }

  logForm(){
    if(this.num_empleado && this.password && this.photo && this.date_empleado){
      console.log('logForm', this.num_empleado , this.password , this.photo)
      let data = {
        num_empleado: this.num_empleado,
        password: this.password,
        photo: this.photo,
        date_empleado: this.date_empleado
      }

      this.users.registerUser(data).subscribe(data => {
        console.log('data', data)
        if(data['status']){
          this.router.navigateByUrl('/contenido')
        }
      }, err => {
        console.log('err', err.error['message'])
        this.presentToast(err.error['message']);

      })
    
    }else{
      console.log('no logForm')

      this.presentToast('Tienes que llenar los campos correspondientes para registrarte en la aplicación');
    }
  }

  async take(){
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl))
  }

  getDate(value){
    const fecha = moment(value.target.value).format('DD/MM/YYYY');

    this.date_empleado = fecha;
  }


  async presentToast(send) {
    const toast = await this.toastController.create({
      message: send,
      duration: 2000
    });
    toast.present();
  }
}
