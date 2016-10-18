/**
 * Created by lipeiwei on 16/10/18.
 */
import {get} from './apiHelper';
import CommentType from '../constant/commentType';

export function getCommentList(type, id, index) {
  switch (type) {
    case CommentType.ESSAY:
    case CommentType.SERIAL:
    case CommentType.QUESTION:
    case CommentType.MUSIC:
    case CommentType.MOVIE:
      return get(`/comment/praiseandtime/${type}/${id}/${index}`);
    default:
      return Promise.reject('wrong argument');
  }
}