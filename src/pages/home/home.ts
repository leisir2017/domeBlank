import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { User } from '../../model/user';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeProvider } from '../../providers/native/native';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  lists:any=[];
  colors: any = [];
  localtion: string = '定位中..';
  backgrounds = [
    'assets/imgs/background/background-1.jpg',
    'assets/imgs/background/background-2.jpg',
    'assets/imgs/background/background-3.jpg',
    'assets/imgs/background/background-4.jpg'
  ];
  constructor(
  public geolocation: Geolocation,
  public navCtrl: NavController,
  public nativeProvider: NativeProvider,
  public user: User,
  public storage: Storage,
  public modalCtrl: ModalController
  ) {

  }
  golists(){
    this.navCtrl.push('ListPage');
  }


  add(){

      let profileModal = this.modalCtrl.create('AddPage');
       profileModal.onDidDismiss(data => {
        this.getList()
       });
      profileModal.present();

  }

  info(item){
     let modal = this.modalCtrl.create('ShowPage',{info:item});
      modal.present();
  }

   ionViewDidEnter(){
      this.user.username = "leisir";
      this.user.password = "leisir";
      this.user.gender = true;
      this.user.age = 18;
      this.user.intro = '攻城狮';
      this.user.email = '598627144@qq.com';
      this.user.phone = '15927215787';
      this.user.location = '武汉';
      let that = this;
      this.geolocation.getCurrentPosition().then((resp) => {
        console.log(resp)
        //console.log(resp.coords.latitude)
       // resp.coords.latitude
       // resp.coords.longitude
        that.localtion = '武汉';
      }).catch((error) => {
        that.localtion = '定位失败';
        console.log('Error getting location', error);
      });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
       // data can be a set of coordinates, or an error (if an error occurred).
       // data.coords.latitude
       // data.coords.longitude
        that.localtion = '定位失败';
        that.nativeProvider.showToast('定位失败~')
       setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
          that.localtion = '定位中..';
        }, 2000)
        //console.log(data.coords.latitude)
      });
  }

  local(){

  }

   ionViewWillEnter(){
    this.colors = [];
    for(var i=0;i<9;i++)
    {
      let num = Math.ceil(Math.random()*9) + '';
      this.colors.push( 'bordercolor' + <string>num);
    }

     this.getList();
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


  person(){
    this.navCtrl.push('WePage');
  }
  domenu(){
    this.navCtrl.push('AnimatePage');
  }

}
