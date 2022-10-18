import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { environment } from 'src/environments/environment';
import { ModalController, Platform } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { GooglemapsService } from 'src/app/servicios/googlemaps.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  
  constructor(private mapservice:GooglemapsService) { 
  }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.mapservice.createMap();
  }
  ionViewDidLeave(){
    this.mapservice.newMap.destroy();
  }

  }
