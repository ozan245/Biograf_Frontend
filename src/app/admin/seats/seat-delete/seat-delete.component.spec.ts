import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatDeleteComponent } from './seat-delete.component';

describe('SeatDeleteComponent', () => {
  let component: SeatDeleteComponent;
  let fixture: ComponentFixture<SeatDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
