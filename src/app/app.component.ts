import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, Keyboard, AlertController,ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeProvider } from '../providers/native/native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  backButtonPressed: boolean = false;  //用于判断返回键是否触发
  @ViewChild('myNav') nav: Nav;

  constructor(
  public ionicApp: IonicApp,
  public keyboard: Keyboard,
  public alertCtrl: AlertController,
  private toastCtrl: ToastController,
  private native: NativeProvider,
  public platform: Platform, 
  private statusBar: StatusBar,
  splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#488aff');
      splashScreen.hide();
       this.registerBackButtonAction();//注册返回按键事件
       this.assertNetwork();//检测网络

    });
  }

  assertNetwork() {
    if (!this.native.isConnecting()) {
      this.toastCtrl.create({
        message: '未检测到网络,请连接网络',
        showCloseButton: true,
        closeButtonText: '确定'
      }).present();
    }
  }

  registerBackButtonAction() {
     this.platform.registerBackButtonAction(() => {
      
      

      if( this.keyboard.isOpen()){ //如果键盘开启则隐藏键盘
        this.keyboard.close();
        return ;
      }

      //如果想点击返回按钮隐藏toast或loading或Overlay就把下面加上
      // this.ionicApp._toastPortal.getActive() ||this.ionicApp._loadingPortal.getActive()|| this.ionicApp._overlayPortal.getActive()
      let activePortal = this.ionicApp._modalPortal.getActive() || this.ionicApp._toastPortal.getActive() || this.ionicApp._overlayPortal.getActive();
      if (activePortal) {
        activePortal.dismiss();
        return;
      }

      return this.nav.pop() ? this.nav.pop() : this.showExit();
       

     }, 1);
   }

   //退出提示框
   showExit() {
   let thisplatform = this.platform;

   if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      thisplatform.exitApp();
    
    } else {
      this.backButtonPressed = true;
      this.toastCtrl.create({
        message: '再按一次退出应用',
        duration: 2000
      }).present();

      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }
   }
  
}

