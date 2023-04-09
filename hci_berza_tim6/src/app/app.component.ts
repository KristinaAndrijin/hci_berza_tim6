import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';

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
  

    
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:any = {};
  
  constructor() {
    
  }
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Option 1' },
      { item_id: 2, item_text: 'Option 2' },
      { item_id: 3, item_text: 'Option 3' },
      { item_id: 4, item_text: 'Option 4' },
      { item_id: 5, item_text: 'Option 5' },
      { item_id: 6, item_text: 'Option 6' },
      { item_id: 7, item_text: 'Option 7' },
      { item_id: 8, item_text: 'Option 8' },
      { item_id: 9, item_text: 'Option 9' },
      { item_id: 10, item_text: 'Option 10' }
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
  
}
