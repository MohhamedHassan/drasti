import { TestBed } from '@angular/core/testing';

import { FirebaseappService } from './firebaseapp.service';

describe('FirebaseappService', () => {
  let service: FirebaseappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
