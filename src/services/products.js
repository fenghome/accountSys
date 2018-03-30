import request from '../utils/request';
export function getProducts(params){
    return request(`/api/porducts`,{
        method:'GET'
    })
}