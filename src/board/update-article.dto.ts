import { CreateArticleDto } from './create-article.dto';
import { IsNumber, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
