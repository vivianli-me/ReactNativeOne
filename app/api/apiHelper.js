/**
 * Created by lipeiwei on 16/10/3.
 */

const baseUrl = 'http://v3.wufazhuce.com:8000/api';

const showLog = __DEV__;

/**
 * @param url 完整路径
 */
const getFetch = url => {
  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    }
  }).then(convertRespToJson).then(defaultAnalyse);
};

/**
 * @param url 绝对路径
 */
const postFetch = url => jsonData => {
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: jsonData
  }).then(convertRespToJson).then(defaultAnalyse);
};

//拼接参数
const getParam = data => {
  return Object.entries(data).map(([key, value]) => {
    return `${key}=${value}`//TODO 是否得用encodeURI函数
  }).join('&');
};


/**
 * @param path 相对路径
 */
export const get = path => {
  let url = `${baseUrl}${path}`;
  return loggerWrap(`GET  ${url}`)(() => {
    return getFetch(url);
  });
};

/**
 * @param path 相对路径
 */
export const post = path => data => {
  var jsonData = JSON.stringify(data);
  var url = baseUrl + path;
  return loggerWrap(`POST  ${url}  ${jsonData}`)(() => {
    return postFetch(url)(jsonData);
  });
};

/**
 * 日志插件
 * @param requestInfo
 */
const loggerWrap = requestInfo => fetchFunc => {
  if (showLog) {
    let startTime = new Date().getTime();//开始请求时间
    return fetchFunc().then(result => {
      console.log(`${requestInfo}  success  result = ${JSON.stringify(result)} cost time = ${new Date().getTime() - startTime}ms`);
      return result;
    }).catch(err => {
      console.warn(`${requestInfo}  ${err}`);
      return Promise.reject(err);
    });
  }
  return fetchFunc();
};

const convertRespToJson = response => {
  return response.json();
};

const defaultAnalyse = response => {
  if (response.res === 0) {
    return response.data;
  } else {
    console.warn(response.msg);
    throw response.msg;
  }
};