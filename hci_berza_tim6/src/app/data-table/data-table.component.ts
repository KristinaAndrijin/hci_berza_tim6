import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common'; // Import the DatePipe

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, OnChanges {

  // Add initializers for paginator and dataSource
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<any>;
  @Input() tableData?: any[];

  // Other component properties
  selectedTabIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10];
  displayedColumns: string[] = ['date', 'high', 'low', 'open', 'close', 'volume'];

  constructor(private datePipe: DatePipe) { } // Inject the DatePipe

  ngOnInit() {
    // Initialize dataSource with an empty MatTableDataSource
    this.dataSource = new MatTableDataSource<any>([]);
    this.updateTableData(); // Pass the selectedItems property to fetch data
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tableData']) {
      console.log('tab data xdd : ', this.tableData);
      this.updateTableData();
    }
  }

  updateTableData() {
    let data: any[];
    if (this.tableData) {
      data = this.tableData.map(item => {
        // Format high, low, open, and close values to have 2 decimal places
        item.high = parseFloat(item.high).toString();
        item.low = parseFloat(item.low).toString();
        item.open = parseFloat(item.open).toString();
        item.close = parseFloat(item.close).toString();
  
        // Remove excess zeros from the formatted numbers
        item.high = item.high.includes('.') ? item.high.replace(/0+$/, '').replace(/\.$/, '') : item.high;
        item.low = item.low.includes('.') ? item.low.replace(/0+$/, '').replace(/\.$/, '') : item.low;
        item.open = item.open.includes('.') ? item.open.replace(/0+$/, '').replace(/\.$/, '') : item.open;
        item.close = item.close.includes('.') ? item.close.replace(/0+$/, '').replace(/\.$/, '') : item.close;
  
        // Format date to have time and date in simple format
        item.date = this.datePipe.transform(item.date, 'short');
        return item;
      });
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
