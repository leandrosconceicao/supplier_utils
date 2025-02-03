import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NfChaveAcessoComponent } from './nf-chave-acesso.component';

describe('NfChaveAcessoComponent', () => {
  let component: NfChaveAcessoComponent;
  let fixture: ComponentFixture<NfChaveAcessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NfChaveAcessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NfChaveAcessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
