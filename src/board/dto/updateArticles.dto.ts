import { PartialType } from '@nestjs/mapped-types';
import { createArticlesDto } from 'src/board/dto/createArticles.dto';

export class UpdateArticlesDto extends PartialType(createArticlesDto) {}
