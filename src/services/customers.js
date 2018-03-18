import request from '../utils/request';
import qs from 'qs';

export function create(params) {
  return request(`/api/customers`, {
    method: 'post',
    body: JSON.stringify(params)
  })
}
