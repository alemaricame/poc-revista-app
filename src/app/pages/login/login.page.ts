import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from 'src/app/api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  num_empleado; 
  password;

  constructor(
    public toastController: ToastController,
    private users: UserService,
    private router: Router

  ) { }

  ngOnInit() {
  }

  logForm(){
    if(this.num_empleado && this.password){
      let data = {
        num_empleado: this.num_empleado,
        password: this.password
      }
      this.users.loginUser(data).subscribe(resp => {
        console.log('data', resp)
        if(resp['status']){
          this.router.navigateByUrl('/contenido')
        }
      }, err =>{
        console.log('err', err.error['message'])
        this.presentToast(err.error['message']);
      })
    }else{
      this.presentToast('Escribe los datos necesarios')
    }
  }

  async presentToast(send) {
    const toast = await this.toastController.create({
      message: send,
      duration: 2000
    });
    toast.present();
  }
}
