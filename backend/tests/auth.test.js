import test from 'node:test';
import assert from 'node:assert/strict';

test('Sample Test: Auth module sanity check', () => {
  const dummyUser = { email: 'test@example.com', role: 'CUSTOMER' };
  assert.equal(dummyUser.email, 'test@example.com');
  assert.equal(dummyUser.role, 'CUSTOMER');
});
