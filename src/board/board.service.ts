import _ from 'lodash';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from 'src/board/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BoardService {
  // repo 주입
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async getArticles() {
    // 삭제되지 않은 게시물 가져오기
    // id, author, title, createdAt
    return await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'author', 'title', 'createdAt'],
    });
  }

  async getArticleById(id: number) {
    // 삭제되지 않은 게시물 가져오기
    // id, author, title, createdAt
  }

  createArticle(title: string, content: string, password: number) {
    // author, title, content, password
    // author: "test"로 고정
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    // 아이디에 맞는 게시글이 없을 때 NotFoundError
    // 패스워드 맞지 않을 때 UnauthorizedError
    // title, content 변경
  }

  deleteArticle(id: number, password: number) {}
}
