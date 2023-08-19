import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV === 'production',
    }),
    MulterModule.register({
      dest: './upload',
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
