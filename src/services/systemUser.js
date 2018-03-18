import request from '../utils/request';

export function doLogup(params){
  console.log(params);
  return request(`/api/login/logup`,{
    method:'POST',
    body:JSON.stringify(params)
  })
}
