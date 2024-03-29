import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingSpinnerComponent } from './waiting-spinner.component';

describe('WaitingSpinnerComponent', () => {
  let component: WaitingSpinnerComponent;
  let fixture: ComponentFixture<WaitingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingSpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
