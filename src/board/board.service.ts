import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class BoardService {
  private articles = [];
  private articlePasswords = new Map();

  // 게시물 작성 API
  // id는 articles 배열 길이에서 +1
  // id, title, content, password 저장
  createArticle(title: string, content: string, password: number) {
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePasswords.set(articleId, password);
    return this.articles;
  }

  // 게시물 전체 조회 API
  getAllArticles() {
    return this.articles;
  }

  // 게시글 단일 조회 API
  getOneArticle(id: number) {
    return this.articles.find((article) => article.id === id);
  }

  // 게시글 수정 API
  updateArticle(id: number, title: string, content: string, password: number) {
    // id가 있는지 확인
    const article = this.getOneArticle(id);
    if (_.isNil(article)) {
      throw new NotFoundException(`Article id is not Found`);
    }

    // 비밀번호가 맞는지 확인
    const articlePassword = this.articlePasswords.get(id);
    if (articlePassword !== password) {
      throw new UnauthorizedException(`Password is not correct`);
    }

    article.title = title;
    article.content = content;
  }

  // 게시글 삭제
  deleteArticle(id: number, password: number) {
    // id가 맞는지 확인
    const article = this.getOneArticle(id);
    if (_.isNil(article)) {
      throw new NotFoundException(`Article id is not Found`);
    }

    // 비밀번호가 맞는지 확인
    const articlePassword = this.articlePasswords.get(id);
    if (articlePassword !== password) {
      throw new UnauthorizedException(`Password is not correct`);
    }

    // 삭제
    return (this.articles = this.articles.filter(
      (article) => article.id !== id,
    ));
  }
}
