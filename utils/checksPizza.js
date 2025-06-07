import { check } from 'k6';

export function checkPizzaResponse(res) {
  return check(res, {
    'pizza status is 200': (r) => r.status === 200,
  })
}
