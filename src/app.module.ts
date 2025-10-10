import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/categories/category.module';
import { CategoryEntity } from './modules/categories/category.entity';
import { ProductEntity } from './modules/products/entities/product.entity';
import { ProductModule } from './modules/products/product.module';
import { ProductVariantEnity } from './modules/products/entities/product_variant.entity';

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
      entities:[CategoryEntity,ProductEntity,ProductVariantEnity],
      synchronize:true

    }),
    CategoryModule,ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
