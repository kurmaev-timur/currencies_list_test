import { Component, OnInit } from '@angular/core';
import { catchError, filter, interval, mergeMap, of, Subscription, switchMap, timer } from 'rxjs';
import { getCbrData } from '../getCbrData.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  constructor( private getCbrDataService: getCbrData) { }

  cbrResponse!: any;
  subscription: Subscription = new Subscription;
  inputValue: Number = 0;
  isToggle: boolean = false;
  
  ngOnInit(): void {
    this.getCbrDataList(); 
  }
      
  refreshList():void{
    console.log('Данные обнавлены в ручном режиме')
    this.getCbrDataList();
  }

  getCbrDataList(){
    this.getCbrDataService.getCbrJSON().subscribe(response => {
      this.cbrResponse = response.Valute;
      this.calcValue(this.inputValue);
    })
  }

  getInputValue(event: any):void{
    this.inputValue = event.target.value;
    this.calcValue(this.inputValue);
  }

  calcValue(value: any){
    if (value === '' || value === 0){
      this.getCbrDataList();
    }
    else{
     this.cbrResponse.map((el:any) => {
        el.calcValue = Math.round(((value/el.Value)*100))/100
      })
    }
  }

  changeToggle(event:any){
    this.isToggle = event.checked
    this.dataAutoUpdate();
  }


  dataAutoUpdate(){
    if (this.isToggle){
      this.subscription = timer(0, 10000).pipe(
        switchMap(() => {
          return this.getCbrDataService.getCbrJSON()
          .pipe(catchError(err => {
            console.log(err);
            return of(undefined);
          }));
        }),
        filter(response => response !== undefined)
        ).subscribe(response => {
          console.log('Данные обновлены автоматически');
          this.cbrResponse = response?.Valute;
          this.calcValue(this.inputValue);
        });
    }
    else{
      console.log('Автоматическое обновление данных отключено');
      this.getCbrDataList();
      this.subscription.unsubscribe();
    }
  }

  isCalculated(item: any){
    if ( item.calcValue === undefined) {
      return true;
    }
    else{
      return false;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
