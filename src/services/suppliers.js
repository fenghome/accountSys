import request from '../utils/request';

export function getSuppliers(params){
    return request(`/api/products`,{
        method:'GET'
    })
}