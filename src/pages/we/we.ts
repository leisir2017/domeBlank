import { Component } from '@angular/core';
import { Platform,IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { User } from '../../model/user';
import { ListPage } from '../list/list';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';

/**
 * Generated class for the WePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-we',
  templateUrl: 'we.html',
})
export class WePage {
  userInfo : any = {};
  constructor(
  public navCtrl: NavController, 
  public modalCtrl: ModalController, 
  public navParams: NavParams,
  public user: User,
  public storage: Storage,
  public platform: Platform,
  public nativeProvider: NativeProvider) {
  }

  ionViewDidLoad() {
    this.userInfo = this.user;
  }
  clearCache(){
    this.nativeProvider.showLoading('清除缓存中...')
    this.storage.remove("lists");
    this.nativeProvider.hideLoading();
    setTimeout(() => {
      this.nativeProvider.showToast('清除成功');
    }, 1000);

  }

   mylist() {
      this.navCtrl.push('ListPage')
    }

   viewAvatar(index) {
      let picturePaths = [this.userInfo.avatar];
      this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
    }

   edit() {
      this.navCtrl.push('InfoPage')
    }

   about() {
      this.navCtrl.push('AboutPage')
    }
   send() {
      this.navCtrl.push('SendPage')
    }

  setting() {
  }

  miniSoft(){
    this.nativeProvider.minimize();
  }
  exitSoftware(){
      this.platform.exitApp();
  }

}
