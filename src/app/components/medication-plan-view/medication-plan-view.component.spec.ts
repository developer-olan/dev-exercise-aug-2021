import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicationPlanViewComponent } from './medication-plan-view.component';

describe('MedicationPlanViewComponent', () => {
  let component: MedicationPlanViewComponent;
  let fixture: ComponentFixture<MedicationPlanViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicationPlanViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicationPlanViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
