import { PickType } from '@nestjs/mapped-types';
import { CreateArticleDto } from 'src/board/create-article.dto';

export class DeleteArticleDto extends PickType(CreateArticleDto, [
  'password',
] as const) {}
