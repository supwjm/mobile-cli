/*
  平台判断
*/

/**
 * @author xieyihao
 * @desc 判断是否是微信内置浏览器
 * @return  Boolean
 **/
export function isWeiXin(){
  if(typeof window == "undefined") return false;
  var ua = window.navigator.userAgent.toLowerCase();
  return (ua.match(/MicroMessenger/i)=="micromessenger")
}
