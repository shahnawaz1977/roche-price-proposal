import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingLeadComponent } from './marketing-lead.component';

describe('MarketingLeadComponent', () => {
  let component: MarketingLeadComponent;
  let fixture: ComponentFixture<MarketingLeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingLeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingLeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
