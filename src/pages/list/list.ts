import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
	lists:any = [];
  constructor(	
  public storage: Storage,
  public modalCtrl: ModalController,
  public navCtrl: NavController) {
      
  }

  ionViewDidEnter(){

  }
  
  ionViewWillEnter(){
     this.getList();
  }
  
  info(item){
  let modal = this.modalCtrl.create('ShowPage',{info:item});
      modal.present();
  }
  getList(){
    let nowdate = new Date().toLocaleDateString();
        nowdate = nowdate.replace("/",'-').replace("/",'-');
    this.storage.get('lists').then((val) => {
        if(val && val[nowdate])
          this.lists = val[nowdate]
        else
          this.lists = [];
    });
  }
  
}
