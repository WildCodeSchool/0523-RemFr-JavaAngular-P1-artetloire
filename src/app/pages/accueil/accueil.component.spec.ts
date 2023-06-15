import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPageComponent } from './accueil.component';

describe('AccueilComponent', () => {
  let component: AccueilPageComponent;
  let fixture: ComponentFixture<AccueilPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccueilPageComponent]
    });
    fixture = TestBed.createComponent(AccueilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
