import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraReaderComponent } from './camera-reader.component';

describe('CameraReaderComponent', () => {
  let component: CameraReaderComponent;
  let fixture: ComponentFixture<CameraReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CameraReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CameraReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
