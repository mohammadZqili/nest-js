import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'NestJS Admin API is running! 🚀';
  }

  getHealth() {
    return {
      status: 'ok',
      service: 'nestjs-admin-api',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };
  }

  getStatus() {
    return {
      status: 'ok',
      service: 'NestJS Admin API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      features: [
        'User Authentication',
        'JWT Tokens',
        'Swagger Documentation',
        'MySQL Database',
        'Health Monitoring',
      ],
    };
  }
} 