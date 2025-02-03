import { Component, forwardRef, OnInit } from '@angular/core';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { DefaultInputComponent } from '../../default-input/default-input.component';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaFiscalService } from '../../../services/nfs_service/nota-fiscal-services.service';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import XmlForm from '../../../types/xml_generator';

@Component({
  selector: 'app-xml-generator',
  imports: [
    NgxMaskDirective,
    ReactiveFormsModule,
    DefaultInputComponent,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './xml-generator.component.html',
  styleUrl: './xml-generator.component.scss',
  providers: [
    NotaFiscalService,
    ToastrService,
    provideNgxMask({}),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => XmlGeneratorComponent),
      multi: true
    },
    
  ]
})
export class XmlGeneratorComponent implements OnInit {
  xmlForm!: FormGroup;
  processing: boolean = false;
  downloadLink?: string
  parcelas: Array<number>;

  constructor(
    private service: NotaFiscalService,
    private toast: ToastrService
  ) {
    this.parcelas = Array.from({ length: 12 }, (_, i) => i + 1)
  }
 
  ngOnInit(): void {
    this.xmlForm = new FormGroup({
      cnpjEmitente: new FormControl("", [Validators.required]),
      cnpjDestinatario: new FormControl("", [Validators.required]),
      valorNf: new FormControl(0.0, [Validators.required]),
      numeroParcelas: new FormControl(1),
      numeroPedido: new FormControl(""),
      dataEmissao: new FormControl(this.formatDate(new Date()), [Validators.required]),
      dataVencimento: new FormControl(),
      numeroNf: new FormControl("")
    })
    this.initValues();
  }

  getXml() {
    if (this.xmlForm.invalid) {      
      return;
    }
    if (this.downloadLink) {
      window.URL.revokeObjectURL(this.downloadLink);
      this.downloadLink = undefined;
    }
    this.processing = !this.processing;

    const data : XmlForm = {
      cnpjEmitente: this.cnpjEmit?.value,
      cnpjDestinatario: this.cnpjDest?.value,
      valorNf: parseFloat((this.valorNf?.value as string).replace(",", ".")),
      numeroParcelas: parseInt(this.numeroParcelas?.value),
      numeroPedido: this.numeroPedido?.value,
      dataEmissao: this.emissionDate?.value,
      dataVencimento: this.expirationDate?.value,
      numeroNf: this.numeroNf?.value
    }
    this.service.getXml(data).subscribe({
      next: (value) => {
        this.processing = !this.processing;
        try {
          const url = window.URL.createObjectURL(value as Blob);
          this.downloadLink = url;
          const downloadLink = document.createElement("a")
          downloadLink.href = this.downloadLink;
          downloadLink.download = "file.xml";
          downloadLink.click();
          this.toast.success("XML gerado com sucesso!")
        } catch (e) {
          this.toast.error("Houve um problema ao baixar o arquivo")
        }
      },
      error: (err) => {
        this.processing = !this.processing;
        this.toast.error("Houve um problema ao gerar o XML")
      }
    })
  }
  

  private initValues() {
    const currentDate = new Date();
    this.emissionDate?.setValue(this.formatDate(currentDate));
    this.setExpDate();
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  clear() {
    this.xmlForm.reset();
    this.initValues();
  }

  get cnpjEmit() {
    return this.xmlForm.get("cnpjEmitente");
  }

  get cnpjDest() {
    return this.xmlForm.get("cnpjDestinatario");
  }

  get emissionDate() {
    return this.xmlForm.get("dataEmissao");
  }

  get expirationDate() {
    return this.xmlForm.get("dataVencimento");
  }

  get numeroParcelas() {
    return this.xmlForm.get("numeroParcelas");
  }

  get valorNf() {
    return this.xmlForm.get("valorNf");
  }

  get numeroPedido() {
    return this.xmlForm.get("numeroPedido");
  }

  get numeroNf() {
    return this.xmlForm.get("numeroNf");
  }
  
  setExpDate() {
    const emission = this.emissionDate?.value;
    if (emission) {

      const expDt = new Date(emission);

      expDt.setDate(30);

      this.expirationDate?.setValue(this.formatDate(expDt))
    }
  }  

}
