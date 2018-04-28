function getAuthToken(len) {
  let tokenStr = '0123456789abcdefghijklmnopqrstuvwxy';
  let token = '';
  for (let i = 0; i < len; i++) {
    token += tokenStr[Math.floor(Math.random() * tokenStr.length)];
  }
  return token;
}

function getOrderNumber(maxNumber) {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  return 'O' + year + month + ('0000' + maxNumber).substr(-4);
}

module.exports = {
  getAuthToken: getAuthToken,
  getOrderNumber:getOrderNumber
}
