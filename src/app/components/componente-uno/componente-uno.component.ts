import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router,NavigationExtras } from '@angular/router';
import { SqliteService } from 'src/app/servicios/sqlite.service';
import { Cursos } from 'src/app/clases/cursos';

@Component({
  selector: 'app-componente-uno',
  templateUrl: './componente-uno.component.html',
  styleUrls: ['./componente-uno.component.scss'],
})
export class ComponenteUnoComponent implements OnInit {
  buscador:string;
  dato:any;
  handlerMessage = '';
  cursos: Cursos[];
  
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
              state:{cursos:this.cursos}
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
        this.servicioBD.fetchNoticias().subscribe(item=>{
          this.cursos=item;
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
