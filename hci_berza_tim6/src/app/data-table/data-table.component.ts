import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  selectedTabIndex = 0;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]); // Initialize dataSource with an empty array
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25];

  // Dummy data for tab1
  tab1Data = [
    { position: 1, name: 'Dummy 1', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Dummy 2', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Dummy 3', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Dummy 3', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Dummy 3', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Dummy 3', weight: 6.941, symbol: 'Li' },
    { position: 3, name: 'Dummy 3', weight: 6.941, symbol: 'Li' },
    // Add more data as needed
  ];

  // Dummy data for tab2
  tab2Data = [
    { position: 1, name: 'Dummy 4', weight: 9.0122, symbol: 'Be' },
    { position: 2, name: 'Dummy 5', weight: 10.81, symbol: 'B' },
    { position: 3, name: 'Dummy 6', weight: 12.01, symbol: 'C' },
    // Add more data as needed
  ];

  // Dummy data for tab3
  tab3Data = [
    { position: 1, name: 'Dummy 7', weight: 14.01, symbol: 'N' },
    { position: 2, name: 'Dummy 8', weight: 16.00, symbol: 'O' },
    { position: 3, name: 'Dummy 9', weight: 19.00, symbol: 'F' },
    // Add more data as needed
  ];

  constructor() { }

  ngOnInit() {
    this.updateTableData();
  }

  // Update table data based on selected tab
  updateTableData() {
    switch (this.selectedTabIndex) {
      case 0:
        this.dataSource = new MatTableDataSource(this.tab1Data);
        break;
      case 1:
        this.dataSource = new MatTableDataSource(this.tab2Data);
        break;
      case 2:
        this.dataSource = new MatTableDataSource(this.tab3Data);
        break;
      default:
        this.dataSource = new MatTableDataSource();
    }
  }
}
