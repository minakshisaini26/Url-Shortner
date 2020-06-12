import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShortningUrlService {
  url = "https://api-ssl.bitly.com/v4/shorten"

  constructor(private httpClient: HttpClient) { }

  public shortenUrl(long_url:string){
    let payload = {
      "domain": "bit.ly",
      "long_url": long_url
    }
    let headers_json = {
      'Host':'api-ssl.bitly.com',
      'Authorization':'Bearer 229c0fd37285497572daff0948007da219842e9a',
      'Content-Type':'application/json'
    }
    return this.httpClient.post(this.url, payload,{headers:headers_json});
  }
}


