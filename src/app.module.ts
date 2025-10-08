import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/categories/category.module';
import { CategoryEntiy } from './modules/categories/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:+(process.env.DB_PORT!) || 5432,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_NAME,
      entities:[CategoryEntiy],
      synchronize:true

    }),
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
