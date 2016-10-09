/**
 * Created by lipeiwei on 16/10/9.
 */

import {get} from './apiHelper';

export function getMovieList(id) {
  return get(`/movie/list/${id}`);
}

export function getMovieDetail(id) {
  return get(`/movie/detail/${id}`);
}

export function getMovieStory(id) {
  return get(`/movie/${id}/story/1/0`);
}