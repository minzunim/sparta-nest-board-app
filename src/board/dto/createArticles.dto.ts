import { IsNumber, IsString } from 'class-validator';

export class createArticlesDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsNumber()
  password: number;
}
