import { style } from '@angular/animations';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import * as moment from 'moment';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-candlestick-chart',
  templateUrl: './candlestick-chart.component.html',
  styleUrls: ['./candlestick-chart.component.css']
})
export class CandlestickChartComponent implements OnChanges{
  @Input() public dataSet: any[] = [];
  @Input() public title?: string;
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "candle",
          data: this.dataSet
        }
      ],
      chart: {
        height: 500,
        type: "candlestick"
      },
      title: {
        text: this.title,
        align: "left",
        style: {
          fontSize:"18",
          color: '#fff'
        }
      },
      tooltip: {
        enabled: true,
        theme:"dark"
      },
      xaxis: {
        type: "category",
        labels: {
          style: {
            colors: '#fff'
          },
          formatter: function(val) {
            return moment(val).format("MMM DD HH:mm");
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        },
        labels: {
          style: {
            colors: ['#fff']
          }
        }
      }
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSet']) {
      this.chartOptions.series = [
        {
          name: "candle",
          data: changes['dataSet'].currentValue
        }
      ];
      this.chart.updateOptions(this.chartOptions);
    }
    if (changes['title']){
      this.chartOptions.title = {
        text: this.title,
        align:"left"
      }
      this.chart.updateOptions(this.chartOptions);
    }
  }
}
