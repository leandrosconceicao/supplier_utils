import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XmlGeneratorComponent } from './xml-generator.component';

describe('XmlGeneratorComponent', () => {
  let component: XmlGeneratorComponent;
  let fixture: ComponentFixture<XmlGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [XmlGeneratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(XmlGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
