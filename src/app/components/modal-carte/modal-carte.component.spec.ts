import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCarteComponent } from './modal-carte.component';

describe('ModalCarteComponent', () => {
  let component: ModalCarteComponent;
  let fixture: ComponentFixture<ModalCarteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCarteComponent]
    });
    fixture = TestBed.createComponent(ModalCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
