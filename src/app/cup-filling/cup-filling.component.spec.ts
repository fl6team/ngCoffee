import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupFillingComponent } from './cup-filling.component';

describe('CupFillingComponent', () => {
  let component: CupFillingComponent;
  let fixture: ComponentFixture<CupFillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupFillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
