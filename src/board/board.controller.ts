import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from 'src/board/board.service';
import { createArticlesDto } from 'src/board/dto/createArticles.dto';
import { DeleteArticlesDto } from 'src/board/dto/deleteArticles.dto';
import { UpdateArticlesDto } from 'src/board/dto/updateArticles.dto';

@Controller('board')
export class BoardController {
  // 서비스 의존성 주입
  constructor(private readonly boardsService: BoardService) {}

  // 게시글 작성 API
  // 메소드 + 진입 라우터 등록
  // 함수 작성, 어떤 데이터를 보낼 것인지, dto 파일 작성
  // 서비스를 return
  @Post('/articles')
  createArticle(@Body() data: createArticlesDto) {
    return this.boardsService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시글 전체 조회 API
  @Get('/articles')
  getAllArticles() {
    return this.boardsService.getAllArticles();
  }

  // 게시글 단일 조회 API
  @Get('/articles/:id')
  getOneArticle(@Param('id') id: number) {
    return this.boardsService.getOneArticle(id);
  }

  // 게시글 수정 API
  @Put('/articles/:id')
  updateArticle(@Param('id') id: number, @Body() data: UpdateArticlesDto) {
    return this.boardsService.updateArticle(
      id,
      data.title,
      data.content,
      data.password,
    );
  }

  // 게시글 삭제 API
  // delete 메소드, id - param, password - body
  @Delete('/articles/:id')
  deleteArticle(@Param('id') id: number, @Body() data: DeleteArticlesDto) {
    return this.boardsService.deleteArticle(id, data.password);
  }
}
