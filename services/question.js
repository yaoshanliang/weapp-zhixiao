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
