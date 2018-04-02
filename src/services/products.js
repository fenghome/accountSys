import request from '../utils/request';
import qs from 'qs';

export function getProducts(values) {
  let params = {}
  const { searchProductName, currentPage } = values;
  if (searchProductName) {
    params.searchProductName = searchProductName;
  }
  if (currentPage) {
    params.currentPage = currentPage;
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

export function removeFile(params) {
  return request(`/api/upload/`, {
    method: 'DELETE',
    body: JSON.stringify(params)
  })
}

export function updateProductById(params){
  const productId = params.productId;
  return request(`/api/products/${productId}`,{
    method:'PUT',
    body:JSON.stringify(params)
  })
}
