import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjGeneratorComponent } from './cnpj-generator.component';

describe('CnpjGeneratorComponent', () => {
  let component: CnpjGeneratorComponent;
  let fixture: ComponentFixture<CnpjGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CnpjGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
