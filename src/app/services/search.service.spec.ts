import { TestBed } from "@angular/core/testing";

import { searchService } from "./search.service";

describe("searchService", () => {
  let service: searchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(searchService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
