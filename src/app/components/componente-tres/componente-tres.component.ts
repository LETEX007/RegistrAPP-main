import { Component, OnInit } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Component({
  selector: 'app-componente-tres',
  templateUrl: './componente-tres.component.html',
  styleUrls: ['./componente-tres.component.scss'],
})
export class ComponenteTresComponent implements OnInit {

  constructor(private sqlite: SQLite) { }

  ngOnInit() {

  }

  prueba(){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
    
    
        db.executeSql('create table danceMoves(id INTERGER PRIMARY KEY, name VARCHAR(32))', [])
          .then(() => console.log('Executed SQL'))
          .catch(e => console.log(e));
    
    
      })
      .catch(e => console.log(e));
  }
  
}
