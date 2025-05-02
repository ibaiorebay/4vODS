import { TestBed } from '@angular/core/testing';

import { CursoEscolarService } from './curso-escolar.service';

describe('CursoEscolarService', () => {
  let service: CursoEscolarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoEscolarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
