import { Component, NgModule, animate, state, style, transition, trigger } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [trigger(
      'openClose',
      [
        state('collapsed, void', style({width: '0px'})),
        state('expanded', style({width: '170px'})),
        transition(
            'collapsed <=> expanded', [animate(300, style({width: '170px'})), animate(300)])
      ])]
})
export class AppComponent {
  title = 'app works!';
  stateExpression = 'collapsed';

  txtSearchCity = new FormControl();
  options = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
   ];
   filteredOptions: any;

   ngOnInit() {
      this.filteredOptions = this.txtSearchCity.valueChanges 
         .startWith(null)
         .map(name => this.filter(name));

   }

   filter(val: string): string[] {
      return this.options.filter(option => new RegExp(val, 'gi').test(option)); 
   }

   selected(val: string): void {
      //debugger;
   }

   showSearchTextBox(val: string): void {
      this.stateExpression = (this.stateExpression != 'expanded') ? 'expanded' : 'collapsed';
   }
}
