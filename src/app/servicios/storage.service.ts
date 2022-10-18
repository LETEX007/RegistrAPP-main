import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class StorageService {


  private _storage: Storage | null = null;

  constructor(private storage: Storage, private toastController:ToastController) {
    this.Init();
  }

  async Init() {
    const storage = await this.storage.create();
    this._storage = storage;

  }
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }
  public get(key: string) {
    this._storage?.get(key);
  }
  public getAuth(){
    return this._storage?.get('auth');
  }
  public delete(key:string){
    this._storage.remove(key);
  }
}
