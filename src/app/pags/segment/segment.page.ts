import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

import { ToastController,LoadingController, Platform} from '@ionic/angular';
import { Animation, AnimationController } from '@ionic/angular';
import { ElementRef, ViewChild } from '@angular/core';
import { CodeqrService } from 'src/app/servicios/codeqr.service';
import { StorageService } from 'src/app/servicios/storage.service';


@Component({
  selector: 'app-segment',
  templateUrl: './segment.page.html',
  styleUrls: ['./segment.page.scss'],
})
export class SegmentPage implements OnInit, AfterViewInit {
  public playtwo: Animation;
  @ViewChild('anim1', { read: ElementRef, static: true }) anim1: ElementRef;
  @ViewChild('anim2', { read: ElementRef, static: true }) anim2: ElementRef;
  constructor(private animationCtrl: AnimationController,private router: Router,public toastController: ToastController
    ,private loadingCtrl: LoadingController,private scan: CodeqrService,public plt: Platform,private storage:StorageService) { }
  
  ngOnInit() {
 
    
  }
  ngAfterViewInit(){
    const anim2 = this.animationCtrl.create()
      .addElement(this.anim2.nativeElement)
      .duration(1700)
      .iterations(1)
      .fromTo('transform', 'scale(1)', 'scale(9)');

      const anim1 = this.animationCtrl.create()
      .addElement(this.anim1.nativeElement)
      .duration(1700)
      .iterations(1)
      .keyframes([
        { offset: 0, transform: 'translateY(0px) translateY(0px)' },
        { offset: 0.5, transform: 'translateY(0px) translateY(-350px)' },
        { offset: 1, transform: 'scale(0.1) scale(0.2)' },
      ])

      this.playtwo =  this.animationCtrl.create()
      .duration(4000)
      .iterations(1)
      .addAnimation([anim1,anim2]); 
  }


  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000,
      cssClass: 'custom-toast', 
    });
    toast.present();
  }

  stopQR(){
    this.scan.stopScan();
    this.playtwo.stop();
    

  }
  async onScan(){
    await this.playtwo.play();
    this.stopQR();
    this.scan.onScan();
    this.playtwo.stop();

  }

  segmentChanged($event){
    let vista = $event.detail.value
    this.router.navigate(['home/'+vista])
    //this.router.navigate(['/login'])
  }
  closeSesion(){
    this.storage.delete('auth');
    this.router.navigate(['login']);
    this.presentToast("Sesion cerrada", 3000);

  }
}
