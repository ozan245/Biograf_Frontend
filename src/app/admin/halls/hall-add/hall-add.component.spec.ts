import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HallAddComponent } from './hall-add.component';

describe('HallAddComponent', () => {
  let component: HallAddComponent;
  let fixture: ComponentFixture<HallAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HallAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HallAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
