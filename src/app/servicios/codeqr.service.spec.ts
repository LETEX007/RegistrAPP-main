import { TestBed } from '@angular/core/testing';

import { CodeqrService } from './codeqr.service';

describe('CodeqrService', () => {
  let service: CodeqrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeqrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
