import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get application info' })
  @ApiResponse({ status: 200, description: 'Application information' })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('healthz')
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ status: 200, description: 'Health status' })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('status')
  @ApiOperation({ summary: 'Application status' })
  @ApiResponse({ status: 200, description: 'Application status' })
  getStatus() {
    return this.appService.getStatus();
  }
} 