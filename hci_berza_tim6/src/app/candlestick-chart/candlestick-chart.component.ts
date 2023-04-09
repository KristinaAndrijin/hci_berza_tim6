import { Component, Input, ViewChild } from '@angular/core';
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
export class CandlestickChartComponent {
  @Input() public dataSet: any[] = [];
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
        text: "",
        align: "left"
      },
      tooltip: {
        enabled: true
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function(val) {
            return moment(val).format("MMM DD HH:mm");
          }
        }
      },
      yaxis: {
        tooltip: {
          enabled: true
        }
      }
    };
  }

  // public generateDayWiseTimeSeries(baseval:any, count:any, yrange:any) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     series.push([baseval, y]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }

}
