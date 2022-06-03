import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessDirectorComponent } from './access-director.component';

describe('AccessDirectorComponent', () => {
  let component: AccessDirectorComponent;
  let fixture: ComponentFixture<AccessDirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessDirectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessDirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
