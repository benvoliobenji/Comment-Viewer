import { ok } from 'assert';

describe('Test Suite 1', function() {
    it('Test 1', function() {
        ok(true, "This shouldn't fail");
    })

    it('Test 2', function() {
        ok(1 === 1, "This shouldn't fail");
        ok(false, "This should fail");
    })
})