import { Injectable } from '@angular/core';
import { map} from 'rxjs';
import { cbrData } from './cbrData.interface';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class getCbrData {

    private _url ='https://www.cbr-xml-daily.ru/daily_json.js';
    
    constructor(private _http: HttpClient){
    }


    getCbrJSON(){
     return this._http.get<cbrData>(this._url)
      .pipe(map(res =>{ 
            return {
            Valute : Object.values(res['Valute'])
            };
        }))
    }


  



  

}