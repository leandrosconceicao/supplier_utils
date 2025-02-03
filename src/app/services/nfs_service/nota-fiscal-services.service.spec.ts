import { TestBed } from '@angular/core/testing';

import { NotaFiscalService } from './nota-fiscal-services.service';

describe('NotaFiscalServicesService', () => {
  let service: NotaFiscalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotaFiscalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
