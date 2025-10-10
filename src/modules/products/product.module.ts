import { forwardRef, Module } from "@nestjs/common";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { CategoryModule } from "../categories/category.module";
import { ProductVariantEnity } from "./entities/product_variant.entity";

@Module({
    imports:[TypeOrmModule.forFeature([ProductEntity,ProductVariantEnity]),forwardRef(()=>CategoryModule)],
    controllers:[ProductController],
    providers:[ProductService],
    exports:[ProductService]
})

export class ProductModule{}