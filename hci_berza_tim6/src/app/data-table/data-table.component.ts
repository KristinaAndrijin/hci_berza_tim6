import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  // Add initializers for paginator and dataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;

  // Other component properties
  selectedTabIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 15];
  displayedColumns: string[] = ['date', 'high', 'low', 'open','close','volume'];

  constructor() { }

  ngOnInit() {
    // Initialize dataSource with an empty MatTableDataSource
    this.dataSource = new MatTableDataSource<any>([]);
    this.updateTableData();
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
    switch (this.selectedTabIndex) {
      case 0:
        data = this.tab1Data;
        break;
      case 1:
        data = this.tab2Data;
        break;
      case 2:
        data = this.tab3Data;
        break;
      default:
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
