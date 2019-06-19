//校验

//纯数字校验
export function isNum(num) {
  var val = /^[0-9]*$/  //纯数字的正则
  if(val.test(num)){
    return true;
  }
  return false;
}

//校验邮箱
export function isEmail(email) {
  var val =  /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
  if(val.test(email)){
    return true;
  }
  return false;
}

//校验手机
export function isPhone(phone) {
  var val = /^[1][3,4,5,7,8][0-9]{9}$/;
  if(val.test(phone)){
    return true
  }
  return false
}
