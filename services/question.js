import { request } from '../utils/request';
import { config } from '../utils/config';

export function getQuestions(param) {
  return request({
    url: config.prefix + 'question/getQuestions',
    data: param
  });
}

export function chooseSubject(param) {
  return request({
    url: config.prefix + 'question/chooseSubject',
    data: param
  });
}

export function getMySubject(param) {
  return request({
    url: config.prefix + 'question/getMySubject',
    data: param
  });
}