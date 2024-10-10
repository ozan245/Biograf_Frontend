import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallDeleteComponent } from './hall-delete.component';

describe('HallDeleteComponent', () => {
  let component: HallDeleteComponent;
  let fixture: ComponentFixture<HallDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
