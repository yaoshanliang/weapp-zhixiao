import { env } from '../utils/config';

// 获取用户信息
export function getUserInfo(key = '') {
  const userInfo = wx.getStorageSync(env + '_userInfo');
  if (userInfo) {
    if (key) {
      return userInfo[key];
    } else {
      return userInfo;
    }
  } else {
    return ''
  }
}

// 获取token
export function getToken() {
  return getUserInfo('token');
}

// 获取userId
export function getUserId() {
  let timestamp = wx.getStorageSync(env + '_userInfoTimestamp');
  if (!timestamp) {
    return '';
  } else {
    let diff = ((Date.parse(new Date()) / 1000) - timestamp) / (60 * 60);
    if (diff > 10) {
      console.log(diff, ' token过期');
      return '';
    }
  }

  let res = wx.getStorageSync(env + '_userInfo');
  if (res) {
    return res.id;
  }
  return '';
}

// 设置key、value
export function setValue(key, value) {
  wx.setStorageSync(
    env + '_' + key, value
  );
}

// 根据key获取value
export function getValue(key) {
  let res = wx.getStorageSync(env + '_' + key);
  if (res || res == 0) {
    return res;
  }
  return '';
}

// 根据key获取value
export function addValueFromArray(key, value) {
  let arr = wx.getStorageSync(env + '_' + key);
  if (arr.length > 0) {
    if (arr.indexOf(value) == -1) {
      arr.push(value);
    }
    setValue(key, arr);
  } else {
    setValue(key, [value]);
  }
  return arr;
}

// 根据key获取value
export function removeValueFromArray(key, value) {
  let arr = wx.getStorageSync(env + '_' + key);
  if (arr.length > 0) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == value) {
        arr.splice(i, 1);
        break;
      }
    }
    setValue(key, arr)
  }
  return arr;
}