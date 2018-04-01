import request from '../utils/request';
import qs from 'qs';

export function getProducts(values) {
  let params = {}
  const {searchProductName} = values;
  if(searchProductName){
    params.searchProductName = searchProductName;
  }
  params = qs.stringify(params);
  return request(`/api/products?${params}`, {
    method: 'GET',
  })
}

export function saveProduct(params) {
  return request(`/api/products`, {
    method: 'POST',
    body: JSON.stringify(params)
  })
}

export function removeFile(params){
  return request(`/api/upload/`,{
    method:'DELETE',
    body:JSON.stringify(params)
  })
}
