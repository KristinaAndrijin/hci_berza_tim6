import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgApexchartsModule } from "ng-apexcharts";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ServicesModule } from './services/services.module';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { MaterialModule } from './material.module';
import { CandlestickChartComponent } from './candlestick-chart/candlestick-chart.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DataTableComponent } from './data-table/data-table.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { WaitingSpinnerComponent } from './waiting-spinner/waiting-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    CandlestickChartComponent,
    DataTableComponent,
    ErrorDialogComponent,
    WaitingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatDialogModule,
    ServicesModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    DatePipe,
    MatIconModule,
    MaterialModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule.forRoot(),
    ScrollingModule,
    MatSelectModule
  ],
  exports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatButtonModule,
    MatAutocompleteModule
  ],
  providers: [DatePipe, MatDialogModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
