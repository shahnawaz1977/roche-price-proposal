import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterHeadComponent } from './cluster-head.component';

describe('ClusterHeadComponent', () => {
  let component: ClusterHeadComponent;
  let fixture: ComponentFixture<ClusterHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClusterHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
