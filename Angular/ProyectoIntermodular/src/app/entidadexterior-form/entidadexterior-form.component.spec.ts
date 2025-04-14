import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadexteriorFormComponent } from './entidadexterior-form.component';

describe('EntidadexteriorFormComponent', () => {
  let component: EntidadexteriorFormComponent;
  let fixture: ComponentFixture<EntidadexteriorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntidadexteriorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntidadexteriorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
