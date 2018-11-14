import { login, logout } from '../../actions/auth';

test('should trigger login', () => {
  const uid = 'lfjhlkfjhl';
  const action = login(uid);
  expect(action).toEqual({
    type: 'LOGIN',
    uid
  });
});

test('should trigger logout', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
