import request from '../utils/request';
import qs from 'qs';

export function create(params) {
  return request(`/api/customers`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export function getCustomers(params){
  return request(`/api/customers/all`,{
    method:'GET'
  })
}
