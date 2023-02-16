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
    private readonly articleRespository: Repository<Article>,
  ) {}

  async getArticles() {
    // 삭제되지 않은 게시물 가져오기
    // id, author, title, createdAt
    return await this.articleRespository.find({
      where: { deletedAt: null },
      select: ['id', 'author', 'title', 'content', 'createdAt'],
    });
  }

  async getArticleById(id: number) {
    // 삭제되지 않은 게시물 가져오기
    // id, author, title, createdAt
    return await this.articleRespository.findOne({
      where: { id, deletedAt: null },
      select: ['id', 'author', 'title', 'content', 'createdAt'],
    });
  }

  createArticle(title: string, content: string, password: number) {
    // author, title, content, password
    // author: "test"로 고정
    this.articleRespository.insert({
      author: 'test',
      title,
      content,
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    // 해당 게시물의 패스워드 값을 가지고 와야 함
    // 아이디에 맞는 게시글이 없을 때 NotFoundError
    // 패스워드 맞지 않을 때 UnauthorizedError
    // title, content 변경
    const article = await this.articleRespository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (_.isNil(article)) {
      throw new NotFoundException(`Article is not found`);
    }

    if (article.password !== password.toString()) {
      throw new UnauthorizedException(`password is not Correct`);
    }
    this.articleRespository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    // 해당 게시물의 패스워드 값을 가지고 와야 함
    // 아이디에 맞는 게시글이 없을 때 NotFoundError
    // 패스워드 맞지 않을 때 UnauthorizedError
    // 게시물 softdelete
    const article = await this.articleRespository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (_.isNil(article)) {
      throw new NotFoundException(`Article is not found`);
    }

    if (article.password !== password.toString()) {
      throw new UnauthorizedException(`password is not Correct`);
    }
    this.articleRespository.softDelete(id);
  }
}
