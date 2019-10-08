import { request } from '../utils/request';
import { config } from '../utils/config';

export function getQuestions(param) {
  return request({
    url: config.prefix + 'question/getQuestions',
    data: param
  });
}

export function postAnswers(param) {
  return request({
    url: config.prefix + 'question/postAnswers',
    method: 'POST',
    data: param
  });
}

export function postAnswer(param) {
  return request({
    url: config.prefix + 'question/postAnswer',
    method: 'POST',
    data: param
  });
}

export function postCollect(param) {
  return request({
    url: config.prefix + 'question/postCollect',
    method: 'POST',
    data: param
  });
}