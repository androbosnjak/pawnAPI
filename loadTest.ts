import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '20s',
};

export default function () {
  const data = JSON.stringify({ loanSum: 101, customerId: 2 });
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let res = http.post('http://localhost:3000/pawn', data, params);

  check(res, { 'pawn created': (r) => r.status === 201 });
  sleep(0.3);
}
