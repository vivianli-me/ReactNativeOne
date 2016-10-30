/**
 * Created by lipeiwei on 16/10/9.
 */

import {getFetchNeverCached, getFetchFromCache} from './apiHelper';

const regExp = new RegExp('<[a-zA-Z0-9_/]+>|\r\n|\n', 'g');

const replaceHTMLTag = text => {
  if (text == '<br>') {
    return '\n';
  }
  return '';
};

//这个总是不断更新的
export function getMovieList(id) {
  return getFetchNeverCached(`/movie/list/${id}`);
}

export function getMovieDetail(id) {
  return getFetchFromCache(`/movie/detail/${id}`);
}

export function getMovieStory(id) {
  return getFetchFromCache(`/movie/${id}/story/1/0`).then(response => {
    response.data = response.data.map(story => {
      story.content = story.content.replace(regExp, replaceHTMLTag);//过滤html标签
      return story;
    });
    return response;
  });
}

