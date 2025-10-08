import { Module } from "@nestjs/common";
import { CategoryController } from "./category.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryEntiy } from "./category.entity";
import { CategoryService } from "./category.service";

@Module({
    imports:[TypeOrmModule.forFeature([CategoryEntiy])],
    controllers:[CategoryController],
    providers:[CategoryService],
    exports:[CategoryService]
})

export class CategoryModule{}