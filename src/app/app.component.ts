import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  txtSearchCity_class = 'txtSearchCity';

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
      if (this.txtSearchCity_class == 'txtSearchCity') 
        this.txtSearchCity_class = 'txtSearchCity block';
      else
         this.txtSearchCity_class = 'txtSearchCity';
   }
}
