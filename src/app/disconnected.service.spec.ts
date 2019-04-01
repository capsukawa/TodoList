import { TestBed } from '@angular/core/testing';

import { DisconnectedService } from './disconnected.service';

describe('DisconnectedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisconnectedService = TestBed.get(DisconnectedService);
    expect(service).toBeTruthy();
  });
});
