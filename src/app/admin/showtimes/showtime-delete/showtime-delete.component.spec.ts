import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeDeleteComponent } from './showtime-delete.component';

describe('ShowtimeDeleteComponent', () => {
  let component: ShowtimeDeleteComponent;
  let fixture: ComponentFixture<ShowtimeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
