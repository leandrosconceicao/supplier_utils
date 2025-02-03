import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import XmlForm from '../../types/xml_generator';
import { environment } from "../../../environments/environment";
import ChaveAcesso from '../../types/chave_acesso';
import Cnpj from '../../types/cnpj';

@Injectable({
  providedIn: 'root'
})
export class NotaFiscalService {

  private apiNfs: string = environment.apiNfsUrl;
  private apiPosvendas: string = environment.apiPosVendasUrl;

  constructor(private http: HttpClient) { }

  headers = {
    'Accept': '/',
    'Access-Control-Allow-Origin': '*',
  };

  generateCnpj() {

    return this.http.get<Cnpj>(`${this.apiPosvendas}/Util/cnpj`, { headers: this.headers });
  }

  generateNfKey(cnpjEmitente?: string) {

    return this.http.get<ChaveAcesso>(`${this.apiPosvendas}/Util/chaveDeAcesso?cnpjEmitente=${cnpjEmitente}`, { headers: this.headers });
  }

  getXml(data: XmlForm) {
    return this.http.post(
      `${this.apiNfs}/GerarNotaXml`,
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
