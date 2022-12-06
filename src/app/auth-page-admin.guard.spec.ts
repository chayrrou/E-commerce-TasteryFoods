import { TestBed } from '@angular/core/testing';

import { AuthPageAdminGuard } from './auth-page-admin.guard';

describe('AuthPageAdminGuard', () => {
  let guard: AuthPageAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthPageAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
