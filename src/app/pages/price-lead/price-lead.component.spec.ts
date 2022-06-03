import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLeadComponent } from './price-lead.component';

describe('PriceLeadComponent', () => {
  let component: PriceLeadComponent;
  let fixture: ComponentFixture<PriceLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
