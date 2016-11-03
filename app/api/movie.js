/**
 * Created by lipeiwei on 16/10/9.
 */

import {getFetchNeverCached, getFetchFromCache} from './apiHelper';

//这个总是不断更新的
export function getMovieList(id) {
  return getFetchNeverCached(`/movie/list/${id}`);
}

export function getMovieDetail(id) {
  return getFetchFromCache(`/movie/detail/${id}`);
}

export function getMovieStory(id) {
  return getFetchFromCache(`/movie/${id}/story/1/0`);
}