import { Component, NgModule, animate, state, style, transition, trigger } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {HttpService} from './app.component.service';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({width: '0px'})),
        state('expanded', style({width: '300px'})),
        transition(
            'collapsed <=> expanded', [animate(300, style({width: '300px'})), animate(300)])
      ])],
  providers: [HttpService]
})
export class AppComponent {
  title = 'app works!';
  stateExpression = 'collapsed';

  constructor(private _httpService:HttpService) {

  }

  txtSearchCity = new FormControl();
  options = [];
  filteredOptions: any;
  getData: any;

  lat: number;
  lng: number;


  ngOnInit() {
      this.filteredOptions = this.txtSearchCity.valueChanges
        .debounceTime(200) // wait 200ms after each keystroke before considering the term
        .distinctUntilChanged() // ignore if next search term is same as previous
        .switchMap(name => (name && name.length > 2)
           ? this._httpService.getJSONPMethod('http://gd.geobytes.com/AutoCompleteCity?callback=JSONP_CALLBACK&sort=size&q=' + encodeURIComponent(name) + '&_=1489163270176') // return the http search observable
           : Observable.of<string[]>([])) // or the observable of empty heroes if there was no search term
        .catch(error => {
          // TODO: add real error handling
          console.log(error);
          return Observable.of<string[]>([]);
        })

        
  }

  selected(val: string): void {
      this._httpService.getJSONPMethod('http://gd.geobytes.com/GetCityDetails?callback=JSONP_CALLBACK&fqcn=' + encodeURIComponent(this.txtSearchCity.value) + '&_=1489427233326')
        .subscribe(
          (data) => {
            this._httpService.getMethod('http://api.openweathermap.org/data/2.5/forecast?lat=' + data.geobyteslatitude + '&lon=' + data.geobyteslongitude + '&units=metric&appid=0bf971eb6a4bfaad90e8a7a487cad578')
              .subscribe (
                data => this.getData = data
              );

            this._httpService.getJSONPMethod('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK&action=query&list=geosearch&gscoord=' + data.geobyteslatitude + '%7C' + data.geobyteslongitude + '&gsradius=10000&gslimit=10&format=json')
              .subscribe (
                data => {
                  //debugger
                },
                error => {
                  //debugger
                }
              );

            this.testClick(data.geobyteslatitude, data.geobyteslongitude);
          },
          error => alert("Error: " + error._body),
          () => {
            console.log('finished') 
          }
        );
  }

  
  
  testClick(geobyteslatitude: number, geobyteslongitude: number): void {
    this.lat = Number(geobyteslatitude);
    this.lng = Number(geobyteslongitude);
  }

  showSearchTextBox(val: string): void {
      this.stateExpression = (this.stateExpression != 'expanded') ? 'expanded' : 'collapsed';
  }
}
