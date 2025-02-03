import { Component, EventEmitter, forwardRef, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotaFiscalService } from '../../../services/nfs_service/nota-fiscal-services.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-nf-chave-acesso',
  imports: [
    ReactiveFormsModule,
    NgxMaskDirective,
    MatTooltipModule,
    MatIconModule
  ],
  providers: [
    ToastrService,
    NotaFiscalService,
    provideNgxMask({}),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NfChaveAcessoComponent),
      multi: true
    }
  ],
  templateUrl: './nf-chave-acesso.component.html',
  styleUrl: './nf-chave-acesso.component.scss'
})
export class NfChaveAcessoComponent implements OnInit {

  constructor(
    private toast: ToastrService,
    private service: NotaFiscalService
  ) {
    this.keyGenForm = new FormGroup({
      cnpj: new FormControl("", [Validators.required, Validators.pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)])
    })
  }
  ngOnInit(): void {
    const data = sessionStorage.getItem(this.key)
    if (data) {
      this.dataGenerated.push(...JSON.parse(data))
    }
  }

  private readonly key : string = "nfKeyGenerated";

  keyGenForm: FormGroup

  isLoading: boolean = false
  value: string = ""
  dataGenerated: Array<string> = []  

  submit() {
    this.generateKey(this.keyGenForm.value.cnpj)
  }

  generateKey(cnpj: string) {
    this.value = "";
    this.isLoading = !this.isLoading;
    this.service.generateNfKey(cnpj).subscribe({
      next: (data) => {
        this.value = data.key;
        this.manageDataGenerated(data.key);
        this.isLoading = !this.isLoading;
        this.toast.success("Chave de acesso gerada com sucesso")
      },
      error: (err) => {
        console.log(err);
        this.isLoading = !this.isLoading;
        this.toast.error("Houve um problema para gerar a chave de acesso")
      },
    })
  }

  private manageDataGenerated(newData: string) {
    if (this.dataGenerated.length > 4) {
      this.dataGenerated.pop();
    }
    this.dataGenerated.unshift(newData);
    sessionStorage.setItem(this.key, JSON.stringify(this.dataGenerated))
  }

  async copyData() {
    if (!this.value) return;
    if (!navigator.clipboard) {
      this.toast.error("Navegador não suporta funcionalidade")
      return;
    }
    try {
      await navigator.clipboard.writeText(this.value);
      this.toast.success("Chave de acesso copiada para a área de transferência");
    } catch (err) {
      this.toast.error("Erro ao copiar a Chave");
    }
  }

}
