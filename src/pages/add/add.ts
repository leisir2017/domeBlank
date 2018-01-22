import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController,ActionSheetController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeProvider } from '../../providers/native/native';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  data : any = {};
  allowDelete : any = true;
  constructor(
  	public navCtrl: NavController,
  	public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public storage: Storage,
  	public nativeProvider: NativeProvider,
    public viewCtrl: ViewController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }
  ionViewWillLoad() {
    this.data.images = [];
  }
  
  add(){
    if(!this.data.title || this.data.title==''){
      this.nativeProvider.showToast("请输入标题");
      return
    }
    if(!this.data.content || this.data.content==''){
      this.nativeProvider.showToast("请输入内容");
      return
    }
  	let loader = this.loadingCtrl.create({
      content: "发布中..."
    });
    let nowdate = new Date().toLocaleDateString();
        nowdate = nowdate.replace("/",'-').replace("/",'-');
    loader.present();
      this.data.id = new Date().getTime();
      this.data.username = 'leisir';
      this.data.addtime = nowdate
      this.data.like = 0;
      this.data.city = '武汉';

   this.storage.get('lists')
  .then((val)=>{
    console.log(val)
    if(val){
      if(!val){
        val[nowdate] = [];
      }
      let datas = val;
      datas[nowdate].push(this.data);
      this.storage.set('lists',datas);
    }else{
      let datas = {};
      datas[nowdate] = [this.data];
      this.storage.set('lists',datas);
    }
      loader.dismiss();
      this.nativeProvider.showToast("发布成功")
      this.dismiss();
  });
     
  }


  deletePicture(index){
      this.alertCtrl.create({
      title: '确认删除？',
      buttons: [{text: '取消'},
        {
          text: '确定',
          handler: () => {
            this.data.images.splice(index, 1);
          }
        }
      ]
    }).present();
  }

  viewerPicture(index) {//照片预览
    let picturePaths = [];
    for (let fileObj of this.data.images) {
      picturePaths.push(fileObj);
    }
    this.modalCtrl.create('ImgviewPage', {'initialSlide': index, 'picturePaths': picturePaths}).present();
  }

  addimgs(){
    	let actionSheet = this.actionSheetCtrl.create({
      title: '选择照片',
      buttons: [
        {
          text: '相册',
          handler: () => {
              this.upImgs(2)
          }
        },{
          text: '拍照',
          handler: () => {
              this.upImgs(1)
          }
        },{
          text: '取消',
			role: 'destructive',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // 选择上传事件
  upImgs( type ){
    
    let that = this;

    //拍照
    if(type==1){
      that.nativeProvider.getPictureByCamera({
          destinationType: 1//期望返回的图片格式,1图片路径
        }).subscribe(img => {
          that.getPictureSuccess(img);
        });
    }

    //手机相册选择
    if(type==2){
      that.nativeProvider.getMultiplePicture({//从相册多选
          maximumImagesCount: 12,
          destinationType: 1//期望返回的图片格式,1图片路径
        }).subscribe(imgs => {
          for (let img of <string[]>imgs) {
            that.getPictureSuccess(img);
          }
        });
    }
  }

  private getPictureSuccess(img) {
    if( img ){
        //this.nativeProvider.showToast(img)
        this.data.images.push(img)
    }
  }


  dismiss(){
    this.viewCtrl.dismiss();
  }

}
