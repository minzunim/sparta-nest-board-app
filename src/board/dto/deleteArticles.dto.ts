import { PickType } from '@nestjs/mapped-types';
import { createArticlesDto } from 'src/board/dto/createArticles.dto';

export class DeleteArticlesDto extends PickType(createArticlesDto, [
  'password',
] as const) {}
