import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceProposalComponent } from './price-proposal.component';

describe('PriceProposalComponent', () => {
  let component: PriceProposalComponent;
  let fixture: ComponentFixture<PriceProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceProposalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
