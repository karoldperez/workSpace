import { TestBed } from '@angular/core/testing';

import { WsSoapService } from './ws-soap.service';

describe('WsSoapService', () => {
  let service: WsSoapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WsSoapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
