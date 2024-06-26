import { TestBed } from '@angular/core/testing';

import { RagQueryService } from './rag-query.service';

describe('RagQueryService', () => {
  let service: RagQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RagQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
