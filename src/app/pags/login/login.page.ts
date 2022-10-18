import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ToastController } from '@ionic/angular';
import { ApiclientService } from 'src/app/servicios/apiclient.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  dato:any;
  user = {
    usuario: "",
    clave: ""
  }
  field: string = "";
  constructor(private router: Router, public toastController: ToastController,private api:ApiclientService,private storage:StorageService) { } 
  
  ngOnInit() {
  }

  ingresar() {
    if (this.validateModel(this.user)) {
      this.presentToast("Bienvenido "+this.user.usuario, 3000)
    
      let navigationExtras: NavigationExtras = {
        state: {
          user: this.user 
        }
      };
      localStorage.setItem('rango',this.user.usuario) 
      this.router.navigate(['/home'], navigationExtras); 
    }else{
      this.presentToast("Porfavor ingrese "+this.field);
    }

  }

  registrar(){
    let navigationExtras: NavigationExtras={
      state:{dato:this.dato}
    };
    this.router.navigate(['/home'],navigationExtras)
  }

  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {

      if (value == "") {
        this.field = key;
        return false;
      }
    }
    return true;
  }
  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000 
    });
    toast.present();
  }
  recupera(){
    let navigationExtras: NavigationExtras={
      state:{dato:this.dato}
    };
    this.router.navigate(['/recupera'],navigationExtras)
  }
  getUserGit(){
    this.api.getJson().subscribe(async (data)=>{
      let isUser:boolean;
    
      data.alumnos.forEach(element => {
        if (element.username===this.user.usuario && element.password===this.user.clave){
          isUser=true;
          console.log("Usuario valido");
          this.presentToast("Bienvenido "+this.user.usuario, 3000);
          let navigationExtras: NavigationExtras = {
            state: {
              user: this.user
            }
          };
          this.router.navigate(['/home'], navigationExtras);
          this.storage.set('auth',isUser);
        }
      });
      if (!isUser){
        console.log("NO ES USUARIO");
        this.presentToast("El usuario "+this.user.usuario+ " no esta registrado en la base de datos", 3000);
        //toast o mensaje
      }
    });
  }
}
