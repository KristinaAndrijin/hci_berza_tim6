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
  selectedItems: Set<string> = new Set();
  candlestickChartData: any[] = [];
  dropdownList:any = [];
  dropdownSettings:any = {};
  csvData: any = [];
  selectedOptionSimple: string = "";
  companies: boolean = false;
  options = ['Daily', 'Weekly', 'Monthly', 'Intraday 5', 'Intraday 15', 'Intraday 30', 'Intraday 60'];
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
      this.companies = this.selectedRadioComp == "Companies"
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
    this.fetchData();
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
      enableCheckAll: false,
      allowSearchFilter: true,
      enableFilterSearch: true,
      showCheckAll: false,
      showUncheckAll: true,
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

}
