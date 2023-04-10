import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';




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
  selectedRadioComp: string = "currencies";
  selectedRadioParam: string = "high";
  selectedItems: any;
  candlestickChartData: any[] = [];
  dropdownList:any = [];
  dropdownSettings:any = {};
  csvData: any = [];
  selectedOptionSimple: string = "";
  companies: boolean = false;
  options = ['1min','5min', '15min', '30min', '60min', 'Daily', 'Weekly', 'Monthly'];
  selectedOptionTime = "Daily";

  constructor(private apiService:ApiService, private http: HttpClient) {  }
  
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
  
    onRadioCompaniesSelected(event: any) {
      this.selectedRadioComp = event.target.value;
      console.log('Selected radio: ', this.selectedRadioComp);
      this.companies = this.selectedRadioComp == "companies"
      this.selectedItems = new Set();
    }

    onRadioParamSelected(event: any) {
      this.selectedRadioParam = event.target.value;
      console.log('Selected radio: ', this.selectedRadioParam);
      this.selectedItems = new Set();
    }

    onItemSelect(item: any) {
      console.log(item);
      console.log(this.selectedItems);
      if(this.companies){
        if(this.oneOrNoneSelected()){
          const interval = this.selectedOptionTime.replace(/\s/g, '');
          if(this.options.slice(0,5).includes(interval)){
            const company = this.selectedOptionTime[0].split(',')[0];
            this.fetchStocksIntradayData(company,interval);
          }
          else if(interval === this.options[5]){
            const company = this.selectedOptionTime[0].split(',')[0];
            this.fetchStocksData('TIME_SERIES_DAILY_ADJUSTED',company);
          }
          else if(interval === this.options[6]){
            const company = this.selectedItems[0].split(',')[0];
            this.fetchStocksData('TIME_SERIES_WEEKLY',company);
          }
          else if(interval === this.options[7]){
            const company = this.selectedItems[0].split(',')[0];
            this.fetchStocksData('TIME_SERIES_MONTHLY',company);
          }
        }
      }
    }
    onSelectAll(items: any) {
      console.log(items);
    }
   
    onItemDeSelect(item: any) {
      console.log('Item deselected:', item);
      console.log(this.selectedItems);
    }
    onOptionSelectedTimeBox(event: any) {
      console.log('Selected option: ', event.value);
    }
    


  async ngOnInit() {
    this.selectedItems = new Set();
    this.fetchCurrencies().then((list) => {
      this.dropdownList = list;
    }).catch((error) => {
      console.error(error);
    });
    this.loadCsvFile().then(() => {
      //console.log('Dropdown list:', this.csvData);
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true
    };
  }

  
  
  fetchStocksIntradayData(symbol: string, time:string) {
    this.apiService.getStocksDataIntraday(symbol, time).subscribe({
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
  fetchStocksData(func: string, symbol: string) {
    this.apiService.getStocksData(func, symbol).subscribe({
      next: (result) => {
        const xd = result[Object.keys(result)[1]];
        console.log(result);
        const data = Object.keys(xd).map((field) => ({
          x: new Date(field),
          y: [xd[field]["1. open"], xd[field]["2. high"], xd[field]["3. low"], xd[field]["4. close"]],
        }));
        this.candlestickChartData = data.slice(0,50);
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

  loadCsvFile(): Promise<void> {
    const csvUrl = 'assets/digital_currency_list.csv';
    return new Promise((resolve, reject) => {
      this.http.get(csvUrl, { responseType: 'text' }).subscribe(data => {
        const rows = data.split('\n');
        const headerRow = rows[0];
        const dataRows = rows.slice(1, -1);
        const options = dataRows.map((row) => {
          const values = row.split(',');
          return values[0].toString().trim() + ", " + values[1].toString().trim();
        });
        this.csvData = options;
        resolve();
      }, error => {
        console.error('Error loading CSV file:', error);
        reject(error);
      });
    });
  }
  oneOrNoneSelected(): boolean {
    return this.selectedItems.length === 1 || this.selectedItems.length === 0 || this.selectedItems.length === undefined 
  }
  moreSelected(): boolean{
    return this.selectedItems.length > 1
  }

}
