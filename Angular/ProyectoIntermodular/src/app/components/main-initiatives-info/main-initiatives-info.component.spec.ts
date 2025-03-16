import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainInitiativesInfoComponent } from './main-initiatives-info.component';

describe('MainInitiativesInfoComponent', () => {
  let component: MainInitiativesInfoComponent;
  let fixture: ComponentFixture<MainInitiativesInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainInitiativesInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainInitiativesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
