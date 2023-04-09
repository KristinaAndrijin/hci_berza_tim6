import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';


/*
interface Option {
  name: string;
  value: string;
  selected: boolean;
}
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  selectedOption: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedRadio: string = "";
  selectedItems: Set<string> = new Set();
  candlestickChartData: any[] = [];

  constructor(private apiService:ApiService) {  }
  
    onOptionSelected(event: any) {
      this.selectedOption = event.target.value;
      console.log('Selected option: ', this.selectedOption);
    }
  
    onStartDateSelected(event: any) {
      this.startDate = new Date(event.target.value);
      console.log('Start date selected: ', this.startDate);
    }
  
    onEndDateSelected(event: any) {
      this.endDate = new Date(event.target.value);
      console.log('End date selected: ', this.endDate);
    }
  
    onRadioSelected(event: any) {
      this.selectedRadio = event.target.value;
      console.log('Selected radio: ', this.selectedRadio);
    }
  

    /*
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  
  constructor() {
    
  }
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
      { item_id: 6, item_text: 'Mumbai' },
      { item_id: 7, item_text: 'Bangaluru' },
      { item_id: 8, item_text: 'Pune' },
      { item_id: 9, item_text: 'Navsari' },
      { item_id: 10, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  */

  ngOnInit() {
    this.fetchData();
  }
  
  fetchData() {
    this.apiService.getStocksDataIntraday("IBM", "60min").subscribe({
      next: (result) => {
        const xd = result[Object.keys(result)[1]];
        console.log(result);
        const data = Object.keys(xd).map((field) => ({
          x: new Date(field),
          y: [xd[field]["1. open"], xd[field]["2. high"], xd[field]["3. low"], xd[field]["4. close"]],
        })).reverse();
        this.candlestickChartData = data;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Data fetch completed.");
      },
    });
  }
}
