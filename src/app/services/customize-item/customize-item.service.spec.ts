import { TestBed } from '@angular/core/testing';

import { CustomizeItemService } from './customize-item.service';

describe('CustomizeItemService', () => {
  let service: CustomizeItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomizeItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
