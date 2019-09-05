import { request } from '../utils/request';
import { config } from '../utils/config';

export function getSubjects(param) {
  return request({
    url: config.prefix + 'question/subjects',
    data: param
  });
}

export function chooseSubject(param) {
  return request({
    url: config.prefix + 'question/chooseSubject',
    data: param
  });
}