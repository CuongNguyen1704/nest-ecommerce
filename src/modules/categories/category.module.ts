import { forwardRef, Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntity } from "./category.entity";
import { CategoryService } from "./category.service";
import { ProductModule } from "../products/product.module";

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntity]),forwardRef(()=>ProductModule)],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports:[CategoryService,TypeOrmModule]
})

export class CategoryModule{}