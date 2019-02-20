import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
describe('TodoService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TodoService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=todo.service.spec.js.map