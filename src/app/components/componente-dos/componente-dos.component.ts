import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { SqliteService } from 'src/app/servicios/sqlite.service';
import { Historial } from 'src/app/clases/historial';

@Component({
  selector: 'app-componente-dos',
  templateUrl: './componente-dos.component.html',
  styleUrls: ['./componente-dos.component.scss'],
})
export class ComponenteDosComponent implements OnInit {
  buscador:string;
  dato:any;
  handlerMessage = '';
  history: Historial[];
  async presentAlertForgot() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      subHeader: 'Soporte',
      message: '¿Estas seguro de continuar?',
      buttons: [
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.handlerMessage = 'Alert confirmed';
            let navigationExtras: NavigationExtras={
              state:{history:this.history}
            };
            this.router.navigate(['/home/asistencia'],navigationExtras)
          },
        },
      ],
    });

    await alert.present();
  }
  constructor(private router: Router,private alertController: AlertController,private servicioBD: SqliteService) { }

  ngOnInit(){
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchHistorial().subscribe(item=>{
          this.history=item;
        });
      }
    });
  }
  
  asistencia(){
    let navigationExtras: NavigationExtras={
      state:{dato:this.dato}
    };
    this.router.navigate(['/asistencia'],navigationExtras)
  }


}
