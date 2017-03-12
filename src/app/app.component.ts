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
  getData: string;

  ngOnInit() {
      this.filteredOptions = this.txtSearchCity.valueChanges
        .debounceTime(200) // wait 200ms after each keystroke before considering the term
        .distinctUntilChanged() // ignore if next search term is same as previous
        .switchMap(name => (name && name.length > 2)
           ? this._httpService.getMethod('http://gd.geobytes.com/AutoCompleteCity?callback=JSONP_CALLBACK&sort=size&q=' + encodeURIComponent(name) + '&_=1489163270176') // return the http search observable
           : Observable.of<string[]>([])) // or the observable of empty heroes if there was no search term
        .catch(error => {
          // TODO: add real error handling
          console.log(error);
          return Observable.of<string[]>([]);
        })
  }

  /*filter(val: string): string[] {
      // test my new service
      this._httpService.getMethod('http://gd.geobytes.com/AutoCompleteCity?callback=JSONP_CALLBACK&sort=size&q=' + encodeURIComponent(val) + '&_=1489163270176')
        .subscribe(
          data => this.getData = JSON.stringify(data),
          error => alert("Error: " + error._body),
          () => {
            console.log('finished') 
          }
        );
      
      //this.options = this.getData ? JSON.parse(this.getData) : [];
      return this.getData ? JSON.parse(this.getData) : [];
  }*/

  selected(val: string): void {
      // TODO get data from txtSearchCity
      //debugger;
  }

  showSearchTextBox(val: string): void {
      this.stateExpression = (this.stateExpression != 'expanded') ? 'expanded' : 'collapsed';
  }
}
