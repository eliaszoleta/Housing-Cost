import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

const client = axios.create({ baseURL: API_BASE, timeout: 20000 });

function unwrap(promise) {
  return promise
    .then((res) => res.data)
    .catch((err) => {
      const message = err.response?.data?.error || err.message || 'Something went wrong.';
      throw new Error(message);
    });
}

export function postCalculate(payload) {
  return unwrap(client.post('/api/calculate', payload));
}

export function getStates() {
  return unwrap(client.get('/api/states'));
}

export function geocodeAddress(address) {
  return unwrap(client.get('/api/location/geocode', { params: { address } }));
}

export function getProximity(lat, lng) {
  return unwrap(client.get('/api/location/proximity', { params: { lat, lng } }));
}
