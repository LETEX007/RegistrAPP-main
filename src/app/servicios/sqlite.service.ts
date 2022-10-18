import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cursos } from '../clases/cursos';
import { Historial } from '../clases/historial';
@Injectable({
  providedIn: 'root'
})
export class SqliteService {
  public database: SQLiteObject;
  // tblAlumno:string="CREATE TABLE IF NOT EXISTS alumno(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL,token TEXT NOT NULL);";
  tblCursos:string="CREATE TABLE IF NOT EXISTS cursos(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL,seccion TEXT NOT NULL);";
  tblHistorial:string="CREATE TABLE IF NOT EXISTS historial(id INTEGER PRIMARY KEY autoincrement, curso VARCHAR(50) NOT NULL,fecha TEXT NOT NULL, presente boolean NOT NULL);";
  registro1:string="INSERT or IGNORE INTO cursos (id, nombre,seccion) VALUES (1,'JavaScript','003D'),(2,'Python','001D'),(3,'C#','005D'),(4,'PHP','009D');";
  listaCursos=new BehaviorSubject([]);
  listaHistorial=new BehaviorSubject([]);
  private isDbReady:BehaviorSubject<boolean>=new BehaviorSubject(false);

    constructor(private sqlite:SQLite, 
      private platform: Platform, 
      public toastController: ToastController) 
      {
        this.crearBD();
      }
    crearBD() {
      this.platform.ready().then(()=>{
        this.sqlite.create({
          name: 'asistencia.db',//nombre de la BD
          location: 'default'
        }).then((db: SQLiteObject)=>{
          this.database=db;
          //mensaje de exito
          // this.presentToast("BD Creada!!")
          //llamo a la creación de tabla(s)
          this.crearTablas();
        }).catch(e=>this.presentToast(e));
      });
    }
  
    async crearTablas() {
      try {
        await this.database.executeSql(this.tblCursos,[]);
        await this.database.executeSql(this.tblHistorial,[]);
        await this.database.executeSql(this.registro1,[]);
        // this.presentToast("Tabla Creada!!")
        this.buscarCursos();
        this.buscarHistorial();
        this.isDbReady.next(true);
      } catch (error) {
        this.presentToast("Error en Crear Tabla: "+ error)
      }
    }
    buscarCursos() {
      return this.database.executeSql('SELECT * FROM cursos',[])
      .then(res=>{
        let items: Cursos[]=[];
        if(res.rows.length>0){
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              nombre: res.rows.item(i).nombre,
              seccion:res.rows.item(i).seccion
            });          
          }
        }
        this.listaCursos.next(items);
      });
    }
    buscarHistorial() {
      return this.database.executeSql('SELECT * FROM historial',[])
      .then(res=>{
        let items: Historial[]=[];
        if(res.rows.length>0){
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              curso: res.rows.item(i).curso,
              fecha:res.rows.item(i).fecha,
              presente:res.rows.item(i).presente
            });          
          }
        }
        this.listaHistorial.next(items);
      });
    }
    addHistorial(qr){
      let data=qr;
      return this.database.executeSql('INSERT INTO historial(curso,fecha,presente) VALUES(?,?,?)',data)
      .then(()=>{
        this.buscarHistorial();
      });
    }
  
    dbState(){
      return this.isDbReady.asObservable();
    }
  
    fetchNoticias(): Observable<Cursos[]> {
      return this.listaCursos.asObservable();
    }
    fetchHistorial(): Observable<Historial[]> {
      return this.listaHistorial.asObservable();
    }
  
    async presentToast(mensaje: string) {
      const toast = await this.toastController.create({
        message: mensaje,
        duration: 3000
      });
      toast.present();
    }
}
