import { Injectable } from "@angular/core";
import { Response, Http } from "@angular/http";
import { APP_SERVE_URL } from "../../providers/Constants";
import 'rxjs/add/operator/map';
import { HttpserviceProvider } from '../../providers/httpservice/httpservice';

@Injectable()
export class WeService {
  constructor(
  public http: Http,public httpService: HttpserviceProvider) {
  }
  

  //版本检测
  getVersion(){
      return this.httpService.get( 'version/index').map((res: Response) => res.json());
  }

}
