import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public user: User, public storage: Storage, public nativeProvider: NativeProvider) {
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
      this.navCtrl.push(ListPage,{username:this.user.username})
    }

   edit() {
    }

  setting() {
  }

  exitSoftware(){
    this.nativeProvider.minimize();
  }

}
