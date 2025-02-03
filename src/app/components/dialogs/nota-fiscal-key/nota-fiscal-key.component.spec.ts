import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotaFiscalKeyComponent } from './nota-fiscal-key.component';

describe('NotaFiscalKeyComponent', () => {
  let component: NotaFiscalKeyComponent;
  let fixture: ComponentFixture<NotaFiscalKeyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotaFiscalKeyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotaFiscalKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
