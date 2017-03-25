import { Component, NgModule, animate, state, style, transition, trigger, Pipe, PipeTransform } from '@angular/core';
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
  stateExpression = 'collapsed';

  constructor(private _httpService:HttpService) {

  }

  txtSearchCity = new FormControl();
  options = [];
  filteredOptions: any;
  cityData = [];

  lat: number;
  lng: number;

  sitesArr = [];
  
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
                data => this.cityData = data.list
              );

            this._httpService.getJSONPMethod('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK&action=query&list=geosearch&gscoord=' + data.geobyteslatitude + '%7C' + data.geobyteslongitude + '&gsradius=10000&gslimit=10&format=json')
              .subscribe (
                data => {
                  var pagesIDArr = "";
                  for (var i = 0; i < data.query.geosearch.length; i++)
                    pagesIDArr += String(data.query.geosearch[i].pageid) + "|"
                  
                  if (pagesIDArr.length > 0)
                    pagesIDArr = pagesIDArr.substring(0, pagesIDArr.length - 1);

                  this._httpService.getJSONPMethod('https://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK&format=json&action=query&prop=extracts&exlimit=max&explaintext&exintro&pageids=' + encodeURIComponent(pagesIDArr) + '&redirects=')
                    .subscribe (
                      data => {
                        this.sitesArr = [];
                        for (var key in data.query.pages) {
                          this.sitesArr.push(data.query.pages[key])
                        }
                      },
                      error => {
                        
                      }
                    );
                },
                error => {
                  //debugger
                }
              );

            this.lat = Number(data.geobyteslatitude);
            this.lng = Number(data.geobyteslongitude);
          },
          error => alert("Error: " + error._body),
          () => {
            console.log('finished') 
          }
        );
  }

  showSearchTextBox(val: string): void {
      this.stateExpression = (this.stateExpression != 'expanded') ? 'expanded' : 'collapsed';
  }
}

