import request from '../utils/request';
import qs from 'qs';

export function create(params) {
  return request(`/api/customers`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export function getCustomers(value) {
  const params = value ? qs.stringify(value) : '';
  return request(`/api/customers?${params}`, {
    method: 'GET'
  })
}

export function updateCustomerById(params) {
  return request(`/api/customers/${params.customerId}`, {
    method: 'PUT',
    body: JSON.stringify(params)
  })
}

export function deleteCustomerById(params) {
  return request(`/api/customers/${params}`, {
    method: 'DELETE'
  })
}

export function searchCustomers(params) {
  return request(`/api/customers/${params}`, {
    method: 'GET'
  })
}
