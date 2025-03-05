import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInitiativesFormComponent } from './main-initiatives-form.component';

describe('MainInitiativesFormComponent', () => {
  let component: MainInitiativesFormComponent;
  let fixture: ComponentFixture<MainInitiativesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInitiativesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainInitiativesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
