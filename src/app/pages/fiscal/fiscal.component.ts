import { Component } from '@angular/core';
import { CnpjGeneratorComponent } from "../../components/fiscal/cnpj-generator/cnpj-generator.component";
import { NfChaveAcessoComponent } from "../../components/fiscal/nf-chave-acesso/nf-chave-acesso.component";
import { XmlGeneratorComponent } from "../../components/fiscal/xml-generator/xml-generator.component";
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-fiscal',
  imports: [ CnpjGeneratorComponent, NfChaveAcessoComponent, XmlGeneratorComponent, MatGridListModule],
  templateUrl: './fiscal.component.html',
  styleUrl: './fiscal.component.scss'
})
export class FiscalComponent {

}
