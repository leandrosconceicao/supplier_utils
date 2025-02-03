import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import XmlForm from '../../types/xml_generator';
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  private url: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  headers = {
    'Accept': '/',
    'Access-Control-Allow-Origin': '*',
  };

  generateCnpj() {

    return this.http.get<{
      cnpj: string
    }>(this.url, { headers: this.headers });
  }

  generateNfKey(cnpj?: string) {

    return this.http.get<{
      key: string
    }>(`${this.url}/chaveDeAcesso?cnpj=${cnpj}`, { headers: this.headers });
  }

  getXml(data: XmlForm) {
    return this.http.post(
      `${this.url}/gerarXml`,
      data,
      {
        responseType: 'blob' as 'json',
        headers: {
          'Accept': 'application/xml',
        }
      }
    )
  }
}
