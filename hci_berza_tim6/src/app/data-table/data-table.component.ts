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
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() { }

  ngOnInit() {
    // Initialize dataSource with an empty MatTableDataSource
    this.dataSource = new MatTableDataSource<any>([]);
    this.updateTableData();
  }

  // Dummy data for tab1
  tab1Data = [
    { position: 1, name: 'Data1Tab1', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Data2Tab1', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Data3Tab1', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Data3Tab1', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Data3Tab1', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Data3Tab1', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Data3Tab1', weight: 6.941, symbol: 'Li' },
    // Add more data as needed
  ];

  // Dummy data for tab2
  tab2Data = [
    { position: 1, name: 'Data1Tab2', weight: 9.0122, symbol: 'Be' },
    { position: 2, name: 'Data2Tab2', weight: 10.81, symbol: 'B' },
    { position: 3, name: 'Data3Tab2', weight: 12.01, symbol: 'C' },
    // Add more data as needed
  ];

  // Dummy data for tab3
  tab3Data = [
    { position: 1, name: 'Data1Tab3', weight: 14.01, symbol: 'N' },
    { position: 2, name: 'Data2Tab3', weight: 16.00, symbol: 'O' },
    { position: 3, name: 'Data3Tab3', weight: 19.00, symbol: 'F' },
    // Add more data as needed
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
