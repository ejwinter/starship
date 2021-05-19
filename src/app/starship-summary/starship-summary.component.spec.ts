import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarshipSummaryComponent } from './starship-summary.component';

describe('StarshipSummaryComponent', () => {
  let component: StarshipSummaryComponent;
  let fixture: ComponentFixture<StarshipSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarshipSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
