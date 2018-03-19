import request from '../utils/request';

export function doLogup(params){
  return request(`/api/login/logup`,{
    method:'POST',
    body:JSON.stringify(params)
  })
}

export function doLogin(params){
  return request(`/api/login`,{
    method:'POST',
    body:JSON.stringify(params)
  })
}
