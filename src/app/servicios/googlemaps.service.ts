import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'src/environments/environment';
import { Geolocation } from '@capacitor/geolocation';
import { ModalComponent } from '../components/modal/modal.component';
import { ModalController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})

export class GooglemapsService {
  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;
  constructor(private modalCtrl: ModalController) {
   }

  async createMap() {
    document.querySelector('capacitor-google-maps').classList.add('activate');
    this.newMap = await GoogleMap.create({
      id: 'my-cool-map',
      element: this.mapRef.nativeElement,
      apiKey: environment.apiKey,
      config: {
        center: {
          lat: -32.7934138,
          lng: -71.5367858,
        },
        zoom: 8,
      },
    });
    await this.marcadores();
  }
  async mygeo(){
    Geolocation.getCurrentPosition().then(async (resp) => {
      await this.newMap.setCamera({
        coordinate: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        },
        zoom:15,
      });
      await this.newMap.addMarker({
        title:'Mi ubicación',
        coordinate: {
          lat: resp.coords.latitude,
          lng: resp.coords.longitude
        }
      });
    });
      
  }
    
  async marcadores(){
    // const ref: Marker[] = [
    //   // one point
    //   {
    //     coordinate:{
    //      lat:-32.7934138,
    //      lng:-71.5367858, 
    //     },
    //     title:'guia pos',
    //     snippet:'cosas de guia',
    //   },
    //   // two point
    //   {        coordinate:{
    //     lat:33.7,
    //     lng:-117.2, 
    //    },
    //    title:'guia pos 2',
    //    snippet:'cosas de guia 2',}
    // ];
    // await this.newMap.addMarkers(ref);
    this.newMap.setOnMarkerClickListener(async (marca) => {
      const modal = await this.modalCtrl.create({
        component: ModalComponent,
        componentProps:{
          marca,
        },
        breakpoints:[0,0.3],
        initialBreakpoint:0.3,
      });
      modal.present();
    })
  }

  
}

