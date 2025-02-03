import { Component, inject } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-nota-fiscal-key',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButton,
    FormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
  ],
  providers: [
    ToastrService
  ],
  templateUrl: './nota-fiscal-key.component.html',
  styleUrl: './nota-fiscal-key.component.scss'
})
export class NotaFiscalKeyComponent {

  constructor(
    private toast: ToastrService
  ) {}
  
  readonly dialogRef = inject(MatDialogRef<NotaFiscalKeyComponent>);

  readonly data = inject(MAT_DIALOG_DATA);

  onNoClick() : void {
    this.dialogRef.close();
  }

  async copyKey(data: string) {
    if (!data) return;
    if (!navigator.clipboard) {
      this.toast.error("Navegador não suporta funcionalidade")
      return;
    }
    try {
      await navigator.clipboard.writeText(data);
      this.toast.success("Chave de acesso copiada para a área de transferência");
    } catch (err) {
      this.toast.error("Erro ao copiar o chave de acesso");
    }
    this.onNoClick()
  }
}
