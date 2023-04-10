import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  // Add initializers for paginator and dataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  @Input() selectedItems?: any[]; 

  // Other component properties
  selectedTabIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['date', 'high', 'low', 'open','close','volume'];

  constructor() { }

  ngOnInit() {
    // Initialize dataSource with an empty MatTableDataSource
    this.dataSource = new MatTableDataSource<any>([]);
    this.updateTableData(); // Pass the selectedItems property to fetch data
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedItems']) {
      console.log('selectedItems lmaoooo: ', this.selectedItems);
    }
  }

  tab1Data = [
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
  ];

  tab2Data = [
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
  ];

  tab3Data = [
    { date: 1, high: 1234, low: 555, open: 123, close:321, volume: 100 },
    { date: 2, high: 12345, low: 556, open: 127, close:361, volume: 200 },
  ];

  updateTableData() {
    let data: any[]; // Specify the type of data as any[]
    // Use the selectedItems property to fetch appropriate data
    if (this.selectedItems) {
      data = this.selectedItems;
    } else {
      data = [];
    }
  
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }
  

  onPageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.updateTableData();
  }
}
