import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FormControl } from '@angular/forms';
import { ApiService } from './services/api.service';
import { HttpClient } from '@angular/common/http';
import cli from '@angular/cli';




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
  tableData: any[] = [];
  dropdownList:any = [];
  dropdownSettings:any = {};
  csvData: any = [];
  selectedOptionSimple: string = "";
  companies: boolean = false;
  options = ['1 min','5 min', '15 min', '30 min', '60 min', 'Daily', 'Weekly', 'Monthly'];
  selectedOptionTime = "Daily";
  selectedLegendItem: any;

  constructor(private apiService:ApiService, private http: HttpClient) {  }
      
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
      this.updateCharts();
    }

    onOptionSelectedTimeBox(event: any) {
      console.log('Selected option: ', event.value);
      this.selectedOptionTime = event.value;
      this.updateCharts();
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
        if(result["Error Message"])
        { 
          console.log('error!') //<<<<<<<<<<< handluj error ovde
          return
        }
        else if(result["Note"]){
          console.log("Pretero si!")
          return
        }
        const xd = result[Object.keys(result)[1]];
        console.log(result);
        const chartData = Object.keys(xd).map((field) => ({
          x: new Date(field),
          y: [xd[field]["1. open"], xd[field]["2. high"], xd[field]["3. low"], xd[field]["4. close"]],
        })).reverse();
        console.log("kog djavolaaaaaaaaa");
        this.candlestickChartData = chartData;
        const tbData = Object.keys(xd).map((field) => ({
          date: new Date(field),
          high: xd[field]["2. high"],
          low: xd[field]["3. low"],
          open: xd[field]["1. open"],
          close: xd[field]["4. close"],
          volume: xd[field]["5. volume"]
        }))
        this.tableData = tbData;
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
        if(result["Error Message"])
        { 
          console.log('error!') //<<<<<<<<<<< handluj error ovde
          return
        }
        else if(result["Note"]){
          console.log("Pretero si!")
          return
        }
        const xd = result[Object.keys(result)[1]];
        console.log(result);
        const data = Object.keys(xd).map((field) => ({
          x: new Date(field),
          y: [xd[field]["1. open"], xd[field]["2. high"], xd[field]["3. low"], xd[field]["4. close"]],
        }));
        this.candlestickChartData = data.slice(0,50);
        const tbData = Object.keys(xd).map((field) => ({
          date: new Date(field),
          high: xd[field]["2. high"],
          low: xd[field]["3. low"],
          open: xd[field]["1. open"],
          close: xd[field]["4. close"],
          volume: xd[field]["5. volume"]
        }))
        this.tableData = tbData;
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log("Data fetch completed.");
      },
    });
  }
  fetchCryptoData(func: string, symbol: string) {
    this.apiService.getCryptoData(func, symbol).subscribe({
      next: (result) => {
        if(result["Error Message"])
        { 
          console.log('error!') //<<<<<<<<<<< handluj error ovde
          return
        }
        else if(result["Note"]){
          console.log("Pretero si!")
          return
        }
        const xd = result[Object.keys(result)[1]];
        console.log(result);
        const data = Object.keys(xd).map((field) => ({
          x: new Date(field),
          y: [xd[field][`1a. open (USD)`], xd[field][`2a. high (USD)`], xd[field][`3a. low (USD)`], xd[field][`4a. close (USD)`]],
        }));
        const tbData = Object.keys(xd).map((field) => ({
          date: new Date(field),
          high: xd[field]["2a. high (USD)"],
          low: xd[field]["3a. low (USD)"],
          open: xd[field]["1a. open (USD)"],
          close: xd[field]["4a. close (USD)"],
          volume: xd[field]["5. volume"]
        }))
        this.tableData = tbData;
        console.log(data);
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
  
  updateCharts(): void{
    if(this.companies){
      if(this.selectedLegendItem){
        const interval = this.selectedOptionTime.replace(/\s/g, '');
        if(this.options.slice(0,5).includes(interval)){
          const company = this.selectedLegendItem;
          this.fetchStocksIntradayData(company,interval);
        }
        else if(interval === this.options[5]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_DAILY_ADJUSTED',company);
        }
        else if(interval === this.options[6]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_WEEKLY',company);
        }
        else if(interval === this.options[7]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_MONTHLY',company);
        }
      }
      else {
        //this.candlestickChartData = [];
      }
    }
    else {
      if(this.selectedLegendItem){
        const interval = this.selectedOptionTime.replace(/\s/g, '');
        if(this.options.slice(0,5).includes(interval)){
          console.log("ne moze, plati")  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< hendlaj ilegalno vreme na crypto
        }
        if(interval === this.options[5]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_DAILY',company);
        }
        else if(interval === this.options[6]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_WEEKLY',company);
        }
        else if(interval === this.options[7]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_MONTHLY',company);
        }
      }
      else {
        //this.candlestickChartData = [];
      }
    }
  }

  updateTable(): void{
    if(this.companies){
      //if(this.selectedLegendItem){
        const interval = this.selectedOptionTime.replace(/\s/g, '');
        if(this.options.slice(0,5).includes(interval)){
          const company = this.selectedLegendItem;
          this.fetchStocksIntradayData(company,interval);
        }
        else if(interval === this.options[5]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_DAILY_ADJUSTED',company);
        }
        else if(interval === this.options[6]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_WEEKLY',company);
        }
        else if(interval === this.options[7]){
          const company = this.selectedLegendItem;
          this.fetchStocksData('TIME_SERIES_MONTHLY',company);
        }
      //}
      /*else {
        //this.candlestickChartData = [];
      }*/
    }
    else {
      if(this.selectedLegendItem){
        const interval = this.selectedOptionTime.replace(/\s/g, '');
        if(this.options.slice(0,5).includes(interval)){
          console.log("ne moze, plati")  //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< hendlaj ilegalno vreme na crypto
        }
        if(interval === this.options[5]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_DAILY',company);
        }
        else if(interval === this.options[6]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_WEEKLY',company);
        }
        else if(interval === this.options[7]){
          const company = this.selectedLegendItem;
          this.fetchCryptoData('DIGITAL_CURRENCY_MONTHLY',company);
        }
      }
      else {
        //this.candlestickChartData = [];
      }
    }
  }

  selectItemInLegend(event:any){
    const clicked = event.target as HTMLDivElement;
    this.selectedLegendItem = clicked.innerText;
    this.updateCharts();
  }

}
