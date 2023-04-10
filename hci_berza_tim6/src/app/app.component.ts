import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title:string = "hci_berza_tim6";
  selectedOption: string = "";
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedRadio: string = "";
  selectedItems: Set<string> = new Set();
  candlestickChartData: any[] = [];
  dropdownList:any = [];
  dropdownSettings:any = {};

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

    onItemSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
      console.log(items);
    }
   
    onItemDeSelect(item: any) {
      console.log('Item deselected:', item);
      console.log(this.selectedItems);
    }


  async ngOnInit() {
    this.fetchData();
    this.selectedItems = new Set();
    this.fetchCurrencies().then((list) => {
      this.dropdownList = list;
    }).catch((error) => {
      console.error(error);
    });
    console.log(this.dropdownList);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true
    };
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

  async fetchCurrencies() {
    console.log('hi');
    let list = []
    try {
      const currencies = await this.apiService.getCurrencies();
      for (let i=0; i < currencies.length; i++) {
        list.push(currencies[i]);
      }
      return list;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

}
