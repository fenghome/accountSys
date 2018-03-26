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

export function getCustomerById(params){
  return request(`/api/customers/${params.customerId}`,{
    method:'PUT',
    body:JSON.stringify(params)
  })
}

export function deleteCustomerById(params){
  return request(`/api/customers/${params}`,{
    method:'DELETE'
  })
}