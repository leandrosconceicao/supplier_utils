import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-default-input',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [
    provideNgxMask({}),
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DefaultInputComponent),
      multi: true
    }
  ],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.scss'
})
export class DefaultInputComponent {

  @Input() inputMask: string = "";
  @Input() placeholder: string = "";
  @Input() label: string = "";
  @Input() inputName: string = "";
  @Input() leadZero: boolean = false;
  @Input() thousandLimiter: string = "";
  @Input() inputType: string = "text";
  @Input() isInvalid: boolean = false;
  @Input() invalidMessage: string = "";

  value: string = "";
  onChange: any = () => {};
  onTouched: any = () => {};

  onInput(event: Event){
    const value = (event.target as HTMLInputElement).value
    this.onChange(value)
  }

  writeValue(value: any): void {
    this.value = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {}

}
