import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtimeUpdateComponent } from './showtime-update.component';

describe('ShowtimeUpdateComponent', () => {
  let component: ShowtimeUpdateComponent;
  let fixture: ComponentFixture<ShowtimeUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowtimeUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowtimeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
