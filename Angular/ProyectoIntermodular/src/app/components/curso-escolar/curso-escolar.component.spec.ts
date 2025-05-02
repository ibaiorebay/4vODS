import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoEscolarComponent } from './curso-escolar.component';

describe('CursoEscolarComponent', () => {
  let component: CursoEscolarComponent;
  let fixture: ComponentFixture<CursoEscolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoEscolarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoEscolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
