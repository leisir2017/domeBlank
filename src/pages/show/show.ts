import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,ModalController } from 'ionic-angular';

/**
 * Generated class for the ShowPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show',
  templateUrl: 'show.html',
})
export class ShowPage {
	info : any = {};
  constructor(public navCtrl: NavController,public modalCtrl: ModalController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.info = navParams.get("info");
  }

  ionViewDidLoad() {

    console.log(this.info);
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  viewerPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.info.images) {
      picturePaths.push(fileObj);
    }
    this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
  }


}
