import { HttpClient } from '@angular/common/http';
import { Environment } from '@angular/compiler-cli/src/ngtsc/typecheck/src/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  apikey:string = "ISES2U34470JTHTG" //ovo definitivno ne treba ovde, ali ne mogu da nadjem enviroments, a i samo ovde se koristi

  public getCryptoData(func:string, symbol:string, market = 'USD'): Observable<any>{ //defaultno u odnosu na americki dolar, parametar tu u slucaju da zelite vise opcija
    return this.http.get<any>(`https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&market=${market}&apikey=${this.apikey}`);
  }

  public getStocksDataIntraday(symbol:string, interval:string): Observable<any>{ 
    return this.http.get<any>(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apikey}`);
  }
  public getStocksData(func:string, symbol:string): Observable<any>{ 
    return this.http.get<any>(`https://www.alphavantage.co/query?function=${func}&symbol=${symbol}&outputsize=compact&apikey=${this.apikey}`);
  }
}
