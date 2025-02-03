import { Component, forwardRef, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NotaFiscalService } from '../../../services/nfs_service/nota-fiscal-services.service';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from "@angular/material/dialog";
import {MatButtonModule} from '@angular/material/button';
import { NotaFiscalKeyComponent } from '../../dialogs/nota-fiscal-key/nota-fiscal-key.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-cnpj-generator',
  imports: [ReactiveFormsModule, MatIconModule, MatTooltipModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './cnpj-generator.component.html',
  styleUrl: './cnpj-generator.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CnpjGeneratorComponent),
      multi: true
    },
    NotaFiscalService,
    ToastrService
  ]
})
export class CnpjGeneratorComponent implements OnInit {

  private readonly key: string = "cnpjGenerated";

  cnpjForm!: FormGroup
  value: string = ""
  dataGenerated: Array<string>
  isLoading: boolean = false;
  isLoadingKey: boolean = false;
  readonly dialog = inject(MatDialog)

  constructor(
    private servico: NotaFiscalService,
    private toast: ToastrService
  ) {
    this.dataGenerated = [];
    this.cnpjForm = new FormGroup({
      input: new FormControl("")
    })
  }
  ngOnInit(): void {
    const data = sessionStorage.getItem(this.key)
    if (data) {
      this.dataGenerated.push(...JSON.parse(data))
    }
  }

  generateCnpj() {
    this.value = "";
    this.isLoading = !this.isLoading;
    this.servico.generateCnpj().subscribe({
      next: (data) => {
        this.value = data.cnpjFormatado.cnpj;
        this.manageDataGenerated(data.cnpjFormatado.cnpj);
        this.isLoading = !this.isLoading;
        this.toast.success("CNPJ gerado com sucesso")
      },
      error: (err) => {
        console.log(err);
        this.isLoading = !this.isLoading;
        this.toast.error("Houve um problema para gerar o CNPJ")
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
      this.toast.success("CNPJ copiado para a área de transferência");
    } catch (err) {
      this.toast.error("Erro ao copiar o CNPJ");
    }
  }

  generateKey(cnpj: string) {
    this.isLoadingKey = !this.isLoadingKey;
    this.servico.generateNfKey(cnpj).subscribe({
      next: (value) => {
        this.isLoadingKey = !this.isLoadingKey;
        this.dialog.open(NotaFiscalKeyComponent, {
          data: value.chaveAcesso
        })
      },
      error: (err) => {
        this.toast.error("Houve um problema para gerar a chave de acesso")
      }
    })
  }
}
