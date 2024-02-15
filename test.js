import http from 'k6/http';
import { check, group, sleep } from 'k6';

export const options = {
    stages: [
        {duration: '10s', target: 10},
        {duration: '30s', target: 15},
        {duration: '10s', target: 10}
    ],
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: ['p(95) < 200', 'p(90) < 400'],
        checks: ['rate > 0.95']
    }
}

export default function () {
    group('Request for my website', function () {
        let value = http.get('https://weillercarvalho.com/')
        check (value, {
            'Status code 200': (r) => r.status === 200
        })
    })
    group('Request for google', function () {
        let value = http.get('https://www.google.com/')
        check (value, {
            'Status code 200': (r) => r.status === 200
        })
    })
}
