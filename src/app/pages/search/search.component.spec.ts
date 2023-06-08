import { ComponentFixture, TestBed } from "@angular/core/testing";

import { searchComponent } from "./search.component";

describe("searchComponent", () => {
  let component: searchComponent;
  let fixture: ComponentFixture<searchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [searchComponent],
    });
    fixture = TestBed.createComponent(searchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
