import { TestBed } from '@angular/core/testing';

import { EntidadExteriorService } from './entidad-exterior.service';

describe('EntidadExteriorService', () => {
  let service: EntidadExteriorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadExteriorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
