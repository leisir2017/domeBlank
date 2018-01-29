import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

/**
 * Generated class for the AnimatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-animate',
    templateUrl: 'animate.html',
})
export class AnimatePage {

    imgitem:any = [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516601408640&di=207a27ca90b19c319bf8514fb66967a0&imgtype=0&src=http%3A%2F%2Ftx.haiqq.com%2Fuploads%2Fallimg%2F150325%2F122251J12-10.jpg",
        "https://www.baidu.com/img/bd_logo1.png",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1516615634642&di=d85aeb2a9dffdde7f4a56864fec52101&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018d4e554967920000019ae9df1533.jpg%40900w_1l_2o_100sh.jpg"
    ]
    canmove:any = false;

    constructor(public navCtrl:NavController, public navParams:NavParams, public viewCtrl:ViewController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AnimatePage');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }


    ngOnInit() {

    }

    tapEvent($event) {
        console.log("tap" + $event.srcEvent.clientX + "," + $event.srcEvent.clientY)

    }

    OnInit() {
        alert("2")
    }

    //长按手势
    pressEvent($event) {
        if ($event.isFirst) {
            //边框
            $event.srcEvent.target.style.border = "5px solid red";
            //设置图片为fix
            $event.srcEvent.target.style.position = "fixed";
            //图片中心变为鼠标鼠标；
            $event.srcEvent.target.style.left = $event.srcEvent.clientX - ($event.srcEvent.target.clientWidth / 2) + "px";
            $event.srcEvent.target.style.top = $event.srcEvent.clientY - ($event.srcEvent.target.clientHeight / 2) + "px";
            //设置成可以移动
            this.canmove = true
            console.log($event)
        }
    }

    //拖动手势
    panEvent($event) {
        //如果可以移动
        if (this.canmove) {
            //图片中心随着鼠标移动而移动
            $event.srcEvent.target.style.left = $event.srcEvent.clientX - ($event.srcEvent.target.clientWidth / 2) + "px";
            $event.srcEvent.target.style.top = $event.srcEvent.clientY - ($event.srcEvent.target.clientHeight / 2) + "px";
            if ($event.isFinal) {
                console.log($event)
                this.canmove = false;
                //取当前图片中心到所有被选图片中心的距离，并且取出x,y小于图片长宽/2的一个；如果都不满足则归位；满足则替换url；
                var imglist:any = window.document.getElementsByClassName("dddd");
                for (let i = 0; i < imglist.length; i++) {
                    console.log(Math.abs($event.srcEvent.clientX - imglist[i].x - $event.srcEvent.target.clientWidth / 2) + "," + Math.abs($event.srcEvent.clientY - imglist[i].y - $event.srcEvent.target.clientHeight / 2))
                    if (
                        //当前图中心之差XY都要小于图片长宽一半
                    Math.abs($event.srcEvent.clientX - imglist[i].x - $event.srcEvent.target.clientWidth / 2) < $event.srcEvent.target.clientWidth / 2 &&
                    Math.abs($event.srcEvent.clientY - imglist[i].y - $event.srcEvent.target.clientHeight / 2) < $event.srcEvent.target.clientHeight / 2 &&
                        //剔除拖拽图片本身
                    Math.abs($event.srcEvent.clientX - imglist[i].x - $event.srcEvent.target.clientWidth / 2) != 0 &&
                    Math.abs($event.srcEvent.clientY - imglist[i].y - $event.srcEvent.target.clientHeight / 2) != 0
                    ) {
                        console.log("目标图片" + imglist[i].src);
                        console.log("当前图片" + $event.target.src);
                        var a = imglist[i].src;
                        imglist[i].src = $event.target.src;
                        $event.target.src = a;
                    }
                }
                //归位
                $event.srcEvent.target.style.position = "";
                //取消边框
                $event.srcEvent.target.style.border = "0px";
                console.log("结束" + $event.srcEvent.target.style.left + "," + $event.srcEvent.target.style.top)
            }
        }
    }

    rotate($event) {
        console.log("rotate")
    }

    pinch($event) {
        console.log("pinch")
    }

}
