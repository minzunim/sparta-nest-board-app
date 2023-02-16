import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 컨트롤러서의 역할을 수행하겠다. => Nest.js에게 말함
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
