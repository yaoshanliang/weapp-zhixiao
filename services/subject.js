import { request } from '../utils/request';
import { config } from '../utils/config';

export function getAllSubjects(param) {
  return request({
    url: config.prefix + 'subject/getAllSubjects',
    data: param
  });
}

export function chooseSubject(param) {
  return request({
    url: config.prefix + 'subject/chooseSubject',
    data: param
  });
}

export function getMySubject(param) {
  return request({
    url: config.prefix + 'subject/getMySubject',
    data: param
  });
}