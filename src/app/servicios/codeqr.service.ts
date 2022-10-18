import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import { SqliteService } from 'src/app/servicios/sqlite.service';
@Injectable({
  providedIn: 'root'
})
export class CodeqrService {

  constructor(private servicioBD: SqliteService,public toastController: ToastController,
    public plt: Platform,private loadingCtrl: LoadingController) {
    // BarcodeScanner.prepare();
  }
  async showLoading2() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando...',
      duration: 2000,
      spinner: 'crescent',
    });
    loading.present();
  }
  stopScan(){
    this.plt.backButton.subscribeWithPriority(10,() => {
      BarcodeScanner.stopScan();
      document.querySelector('body').classList.remove('scanner-active');
      this.presentToast("Escaneo cancelado sin resultados");
      this.showLoading2();
    });
    
  }
  
  async onScan(){
    // Check camera permission
    // This is just a simple example, check out the better checks below
    await BarcodeScanner.checkPermission({ force: true });
    
    // make background of WebView transparent
    // note: if you are using ionic this might not be enough, check below
    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');
    const result = await BarcodeScanner.startScan(); // start scanning and wait for a result
    document.querySelector('body').classList.remove('scanner-active');
    // if the result has content
    if (result.hasContent) {
      console.log(result.content) // log the raw scanned content
      this.servicioBD.addHistorial(result.content.split(";"))
      .then( (res) => {
        console.log(res)
      })
      BarcodeScanner.stopScan();
      this.presentToast("Codigo QR: Presente", 3500)
      this.showLoading2();
    };
}

  async presentToast(msg: string, duration?: number) {
    const toast = await this.toastController.create({
      message: msg,
      duration: duration ? duration : 2000,
      cssClass: 'custom-toast', 
    });
    toast.present();
  }
}
